"use client";

import { useEffect, useRef } from "react";

const Player = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const socket = new WebSocket("ws://localhost:3001/ws");

    socket.binaryType = "arraybuffer"; // Set the expected binary type

    socket.onopen = () => {
      console.log("WebSocket connection established");
    };

    socket.onmessage = (event) => {
      if (event.data instanceof ArrayBuffer) {
        console.log("huhi");
        const buffer = event.data;

        // Create a Blob from the ArrayBuffer
        const blob = new Blob([buffer], { type: "video/mp2t" }); // MPEG-TS MIME type

        // Create a URL for the video
        const videoUrl = URL.createObjectURL(blob);

        // Set the video source
        if (videoRef.current) {
          videoRef.current.src = videoUrl;
          videoRef.current.play(); // Auto-play the video
        }
      } else {
        console.error("Received non-ArrayBuffer data:", event.data);
      }
    };

    socket.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    socket.onclose = () => {
      console.log("WebSocket connection closed");
    };

    // Clean up on component unmount
    return () => {
      socket.close();
      // Revoke the video URL
      if (videoRef.current) {
        URL.revokeObjectURL(videoRef.current.src);
      }
    };
  }, []);

  return (
    <div>
      <h1>MPEG-TS Video Streaming via WebSocket</h1>
      <video ref={videoRef} controls style={{ width: "100%", height: "auto" }}>
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default Player;
