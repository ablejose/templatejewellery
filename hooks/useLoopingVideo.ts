"use client";

import { useEffect, type RefObject } from "react";
import type { VideoSegments } from "@/types/brand";

/**
 * Drives loop-window playback for a story video using the supplied SEGMENTS.
 * The UI NEVER guesses loop positions — timing is driven entirely by config
 * (Document 1 §8, Document 3 §5). When no segments are supplied, native
 * `loop` on the element handles playback and this hook is a no-op.
 */
export function useLoopingVideo(
  ref: RefObject<HTMLVideoElement>,
  segments?: VideoSegments,
): void {
  useEffect(() => {
    const video = ref.current;
    if (!video || !segments) return;

    const { loopStart, loopEnd } = segments;

    const onTimeUpdate = () => {
      if (video.currentTime >= loopEnd) {
        video.currentTime = loopStart;
        void video.play();
      }
    };

    video.addEventListener("timeupdate", onTimeUpdate);
    return () => video.removeEventListener("timeupdate", onTimeUpdate);
  }, [ref, segments]);
}
