import { useRef, useEffect, useState, useCallback } from "react";

interface SmartVideoPlayerProps {
  videoId: string;
  title: string;
  onTimeUpdate?: (currentTime: number) => void;
  seekTo?: number | null;
}

const SmartVideoPlayer = ({ videoId, title, onTimeUpdate, seekTo }: SmartVideoPlayerProps) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [player, setPlayer] = useState<any>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval>>();

  // Load YouTube IFrame API
  useEffect(() => {
    if ((window as any).YT) {
      initPlayer();
      return;
    }
    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    document.head.appendChild(tag);
    (window as any).onYouTubeIframeAPIReady = initPlayer;

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [videoId]);

  const initPlayer = useCallback(() => {
    const p = new (window as any).YT.Player("smart-yt-player", {
      videoId,
      playerVars: {
        autoplay: 0,
        rel: 0,
        modestbranding: 1,
        cc_load_policy: 1,
      },
      events: {
        onReady: () => setPlayer(p),
      },
    });
  }, [videoId]);

  // Poll current time
  useEffect(() => {
    if (!player || !onTimeUpdate) return;
    intervalRef.current = setInterval(() => {
      try {
        const time = player.getCurrentTime?.();
        if (typeof time === "number") onTimeUpdate(time);
      } catch {}
    }, 1000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [player, onTimeUpdate]);

  // Handle seek
  useEffect(() => {
    if (seekTo !== null && seekTo !== undefined && player) {
      try {
        player.seekTo(seekTo, true);
        player.playVideo();
      } catch {}
    }
  }, [seekTo, player]);

  return (
    <div className="w-full bg-foreground/5 rounded-xl overflow-hidden">
      <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
        <div id="smart-yt-player" className="absolute inset-0 w-full h-full" />
      </div>
      <div className="px-4 py-2">
        <h3 className="font-display font-bold text-sm text-card-foreground truncate">{title}</h3>
      </div>
    </div>
  );
};

export default SmartVideoPlayer;
