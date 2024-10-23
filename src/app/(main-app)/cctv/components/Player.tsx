"use client";

import Hls from "hls.js";
import { useEffect, useRef } from "react";

const Player = ({ streamUrl }: { streamUrl: string }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;

    const hls = new Hls();
    if (Hls.isSupported()) {
      hls.loadSource(streamUrl);
      hls.attachMedia(video);
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        video.play().catch((err) => {
          console.error("Failed to autoplay the video:", err);
        });
      });
    } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
      // Fallback for Safari
      video.src = streamUrl;
      video.addEventListener("loadedmetadata", () => {
        video.play().catch((err) => {
          console.error("Failed to autoplay the video:", err);
        });
      });
    }

    return () => {
      if (Hls.isSupported()) {
        hls.destroy();
      }
    };
  }, [streamUrl]);

  return (
    <div>
      <h1>MPEG-TS Video Streaming via WebSocket</h1>
      <video
        ref={videoRef}
        autoPlay
        controls
        style={{ width: "100%", height: "auto" }}
        muted
      >
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default Player;
