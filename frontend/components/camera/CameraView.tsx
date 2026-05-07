"use client";

import { useEffect, useRef } from "react";

type CameraViewProps = {
  onStreamReady?: (video: HTMLVideoElement) => void;
  className?: string;
};

export default function CameraView({
  onStreamReady,
  className = "",
}: CameraViewProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    let stream: MediaStream;

    const startCamera = async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode: "environment", // prefer rear camera (mobile)
          },
        });

        if (videoRef.current) {
          videoRef.current.srcObject = stream;

          if (onStreamReady) {
            onStreamReady(videoRef.current);
          }
        }
      } catch (error) {
        console.error("Error accessing camera:", error);
      }
    };

    startCamera();

    // Cleanup: stop camera on unmount
    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [onStreamReady]);

  return (
    <div className={`relative w-full h-full bg-black rounded-lg overflow-hidden ${className}`}>
      <video
        ref={videoRef}
        autoPlay
        playsInline
        className="w-full h-full object-cover"
      />
    </div>
  );
}