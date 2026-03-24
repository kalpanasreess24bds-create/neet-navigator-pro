import { useState, useEffect, useMemo, useCallback } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { MapPin, Navigation, Star, ExternalLink, Search, Locate } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

// Fix default Leaflet icon issue
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

const userIcon = L.divIcon({
  className: "",
  html: `<div style="width:18px;height:18px;background:hsl(243 75% 55%);border:3px solid white;border-radius:50%;box-shadow:0 0 8px rgba(79,70,229,0.6);"></div>`,
  iconSize: [18, 18],
  iconAnchor: [9, 9],
});

const coachingIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

interface CoachingCentre {
  id: number;
  name: string;
  lat: number;
  lng: number;
  rating: number;
  distance: number;
}

const CENTRE_TEMPLATES = [
  { name: "Aakash Institute", rating: 4.5 },
  { name: "Allen Career Institute", rating: 4.7 },
  { name: "Physics Wallah Vidyapeeth", rating: 4.3 },
  { name: "Resonance Eduventures", rating: 4.2 },
  { name: "FIITJEE NEET Division", rating: 4.4 },
  { name: "Unacademy Centre", rating: 4.1 },
  { name: "Career Point NEET Academy", rating: 4.0 },
];

function haversineDistance(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function generateCentres(lat: number, lng: number): CoachingCentre[] {
  return CENTRE_TEMPLATES.map((t, i) => {
    const angle = (i / CENTRE_TEMPLATES.length) * 2 * Math.PI + (Math.random() * 0.5 - 0.25);
    const dist = 2 + Math.random() * 8; // 2-10 km
    const dLat = (dist * Math.cos(angle)) / 111.32;
    const dLng = (dist * Math.sin(angle)) / (111.32 * Math.cos((lat * Math.PI) / 180));
    const cLat = lat + dLat;
    const cLng = lng + dLng;
    return {
      id: i,
      name: t.name,
      lat: cLat,
      lng: cLng,
      rating: t.rating,
      distance: haversineDistance(lat, lng, cLat, cLng),
    };
  }).sort((a, b) => a.distance - b.distance);
}

function RecenterMap({ lat, lng }: { lat: number; lng: number }) {
  const map = useMap();
  useEffect(() => {
    map.setView([lat, lng], 13);
  }, [lat, lng, map]);
  return null;
}

function LoadingSkeleton() {
  return (
    <div className="flex flex-col lg:flex-row gap-4 w-full h-[70vh]">
      <Skeleton className="flex-[3] rounded-2xl min-h-[300px]" />
      <div className="flex-[2] space-y-3">
        {[...Array(4)].map((_, i) => (
          <Skeleton key={i} className="h-24 rounded-xl" />
        ))}
      </div>
    </div>
  );
}

const NearbyCoachingMap = () => {
  const [userPos, setUserPos] = useState<{ lat: number; lng: number } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searching, setSearching] = useState(false);
  const isMobile = useIsMobile();

  const detectLocation = useCallback(() => {
    setLoading(true);
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser.");
      setLoading(false);
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setUserPos({ lat: pos.coords.latitude, lng: pos.coords.longitude });
        setSearchQuery("");
        setLoading(false);
      },
      () => {
        setUserPos({ lat: 28.6139, lng: 77.209 });
        setLoading(false);
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  }, []);

  useEffect(() => { detectLocation(); }, [detectLocation]);

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    setSearching(true);
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchQuery)}&limit=1`
      );
      const data = await res.json();
      if (data.length > 0) {
        setUserPos({ lat: parseFloat(data[0].lat), lng: parseFloat(data[0].lon) });
        setSelectedId(null);
      }
    } catch {
      // silently fail
    } finally {
      setSearching(false);
    }
  };

  const centres = useMemo(() => (userPos ? generateCentres(userPos.lat, userPos.lng) : []), [userPos]);

  if (loading) return <LoadingSkeleton />;
  if (error) return <p className="text-destructive text-center py-10">{error}</p>;
  if (!userPos) return null;

  const openDirections = (lat: number, lng: number) => {
    window.open(`https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`, "_blank");
  };

  return (
    <div className={`flex ${isMobile ? "flex-col" : "flex-row"} gap-4 w-full`} style={{ minHeight: isMobile ? "auto" : "70vh" }}>
      {/* Map */}
      <div className={`${isMobile ? "h-[50vh]" : "flex-[3]"} rounded-2xl overflow-hidden border border-border shadow-sm`}>
        <MapContainer center={[userPos.lat, userPos.lng]} zoom={13} className="h-full w-full" scrollWheelZoom>
          <RecenterMap lat={userPos.lat} lng={userPos.lng} />
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={[userPos.lat, userPos.lng]} icon={userIcon}>
            <Popup><span className="font-semibold text-sm">📍 You are here</span></Popup>
          </Marker>
          {centres.map((c) => (
            <Marker
              key={c.id}
              position={[c.lat, c.lng]}
              icon={coachingIcon}
              eventHandlers={{ click: () => setSelectedId(c.id) }}
            >
              <Popup>
                <div className="space-y-1.5 min-w-[180px]">
                  <p className="font-bold text-sm">{c.name}</p>
                  <p className="text-xs text-muted-foreground">{c.distance.toFixed(1)} km away</p>
                  <div className="flex items-center gap-1 text-xs">
                    <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                    <span>{c.rating}</span>
                  </div>
                  <button
                    onClick={() => openDirections(c.lat, c.lng)}
                    className="mt-1 text-xs font-medium text-primary hover:underline flex items-center gap-1"
                  >
                    <Navigation className="w-3 h-3" /> Get Directions
                  </button>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>

      {/* List */}
      <ScrollArea className={`${isMobile ? "h-[40vh]" : "flex-[2]"}`}>
        <div className="space-y-3 pr-2">
          <h3 className="font-display font-bold text-sm text-foreground flex items-center gap-2">
            <MapPin className="w-4 h-4 text-primary" /> Nearby Coaching Centres
          </h3>
          {centres.map((c) => (
            <Card
              key={c.id}
              className={`cursor-pointer transition-all hover:scale-[1.01] ${selectedId === c.id ? "ring-2 ring-primary" : ""}`}
              onClick={() => setSelectedId(c.id)}
            >
              <CardContent className="p-4 space-y-1.5">
                <div className="flex items-start justify-between">
                  <p className="font-semibold text-sm text-card-foreground">{c.name}</p>
                  <Badge variant="secondary" className="text-[10px] shrink-0">
                    {c.distance.toFixed(1)} km
                  </Badge>
                </div>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3 h-3 ${i < Math.floor(c.rating) ? "fill-yellow-400 text-yellow-400" : "text-muted"}`}
                    />
                  ))}
                  <span className="text-xs text-muted-foreground ml-1">{c.rating}</span>
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  className="w-full mt-2 text-xs h-8"
                  onClick={(e) => {
                    e.stopPropagation();
                    openDirections(c.lat, c.lng);
                  }}
                >
                  <ExternalLink className="w-3 h-3 mr-1" /> Get Directions
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default NearbyCoachingMap;
