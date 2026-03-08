import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Maximize2, Minimize2, Upload } from "lucide-react";

interface VideoPlayerProps {
  videoId?: string;
  localVideoUrl?: string;
  title: string;
  onClose: () => void;
}

const VideoPlayer = ({ videoId, localVideoUrl, title, onClose }: VideoPlayerProps) => {
  const [isFullscreen, setIsFullscreen] = useState(false);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-end sm:items-center justify-center"
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-foreground/60 backdrop-blur-sm" onClick={onClose} />

        {/* Player */}
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className={`relative z-10 w-full bg-card rounded-t-2xl sm:rounded-2xl overflow-hidden ${
            isFullscreen ? "sm:max-w-5xl" : "sm:max-w-2xl"
          }`}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-border/50">
            <h3 className="font-display font-bold text-sm text-card-foreground truncate pr-4">
              {title}
            </h3>
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => setIsFullscreen(!isFullscreen)}
                className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center hover:bg-muted transition-colors"
              >
                {isFullscreen ? (
                  <Minimize2 className="w-4 h-4 text-muted-foreground" />
                ) : (
                  <Maximize2 className="w-4 h-4 text-muted-foreground" />
                )}
              </button>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center hover:bg-muted transition-colors"
              >
                <X className="w-4 h-4 text-muted-foreground" />
              </button>
            </div>
          </div>

          {/* Video Content */}
          {localVideoUrl ? (
            <video
              src={localVideoUrl}
              controls
              autoPlay
              className="w-full aspect-video bg-foreground/5"
            >
              Your browser does not support the video tag.
            </video>
          ) : videoId ? (
            <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
              <iframe
                className="absolute inset-0 w-full h-full"
                src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`}
                title={title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                referrerPolicy="strict-origin-when-cross-origin"
              />
            </div>
          ) : null}

          {/* Bottom safe area for mobile */}
          <div className="h-2 bg-card sm:hidden" />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default VideoPlayer;
