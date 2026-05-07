"use client";

import { useEffect, useRef, useState } from "react";

const COLORS = ["white", "red", "green", "yellow", "orange", "blue"];

export default function CalibratePage() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const [selectedColor, setSelectedColor] = useState("white");
  const [calibration, setCalibration] = useState<Record<string, number[]>>({});

  // Start camera
  useEffect(() => {
    async function startCamera() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.error("Camera access denied:", err);
      }
    }

    startCamera();
  }, []);

  // Capture center color
  const captureColor = () => {
    if (!videoRef.current || !canvasRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    if (!ctx) return;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    const size = 20;

    const imageData = ctx.getImageData(
      centerX - size / 2,
      centerY - size / 2,
      size,
      size
    );

    let r = 0,
      g = 0,
      b = 0;

    for (let i = 0; i < imageData.data.length; i += 4) {
      r += imageData.data[i];
      g += imageData.data[i + 1];
      b += imageData.data[i + 2];
    }

    const pixels = imageData.data.length / 4;
    r = Math.round(r / pixels);
    g = Math.round(g / pixels);
    b = Math.round(b / pixels);

    const newCalibration = {
      ...calibration,
      [selectedColor]: [r, g, b],
    };

    setCalibration(newCalibration);

    // Save locally
    localStorage.setItem("cubeCalibration", JSON.stringify(newCalibration));
  };

  return (
    <div className="flex flex-col items-center min-h-screen p-6">
      <h1 className="text-2xl font-bold mb-4">Color Calibration</h1>

      <p className="mb-6 text-gray-600">
        Place the cube center in the box and capture each color
      </p>

      {/* Camera */}
      <div className="relative w-[320px] h-[240px] bg-black rounded-lg overflow-hidden">
        <video
          ref={videoRef}
          autoPlay
          playsInline
          className="w-full h-full object-cover"
        />

        {/* Center box */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-20 h-20 border-2 border-red-500"></div>
        </div>
      </div>

      {/* Hidden canvas */}
      <canvas ref={canvasRef} className="hidden" />

      {/* Color selector */}
      <div className="flex gap-2 mt-6 flex-wrap justify-center">
        {COLORS.map((color) => (
          <button
            key={color}
            onClick={() => setSelectedColor(color)}
            className={`px-4 py-2 rounded ${
              selectedColor === color
                ? "bg-blue-600 text-white"
                : "bg-gray-200"
            }`}
          >
            {color}
          </button>
        ))}
      </div>

      {/* Capture button */}
      <button
        onClick={captureColor}
        className="mt-6 px-6 py-3 bg-green-600 text-white rounded-xl shadow hover:bg-green-700"
      >
        Capture {selectedColor}
      </button>

      {/* Calibration display */}
      <div className="mt-6 text-sm text-gray-700">
        <h2 className="font-semibold mb-2">Saved Calibration:</h2>
        <pre className="bg-gray-200 p-3 rounded text-xs">
          {JSON.stringify(calibration, null, 2)}
        </pre>
      </div>
    </div>
  );
}