"use client";

import { useRef } from "react";
import { useLoopingVideo } from "@/hooks/useLoopingVideo";
import type { VideoSegments } from "@/types/brand";

interface StoryVideoPlayerProps {
  src: string;
  segments?: VideoSegments;
  label: string;
}

/**
 * Looping Cloudinary story video. Loop timing is driven exclusively by the
 * supplied SEGMENTS (Document 3 §5). When no segments are provided, native
 * `loop` handles playback. Muted + playsInline so autoplay is permitted.
 */
export function StoryVideoPlayer({ src, segments, label }: StoryVideoPlayerProps) {
  const ref = useRef<HTMLVideoElement>(null);
  useLoopingVideo(ref, segments);

  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-card border border-border">
      <video
        ref={ref}
        className="h-full w-full object-cover"
        src={src}
        muted
        autoPlay
        playsInline
        loop={!segments}
        preload="metadata"
        aria-label={label}
      />
    </div>
  );
}
