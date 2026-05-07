"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

import { useCamera } from "../../hooks/useCamera";
import { useScanner } from "../../hooks/useScanner";
import { extractGridColors } from "../../utils/colorUtils";
import { scanCube } from "../../api/scan";

import CameraView from "../../components/camera/CameraView";
import CaptureButton from "../../components/camera/CaptureButton";
import GridOverlay from "../../components/camera/GridOverlay";

import FaceGuide from "../../components/scanner/FaceGuide";
import FacePreview from "../../components/scanner/FacePreview";
import ScanProgress from "../../components/scanner/ScanProgress";

export default function ScanPage() {
  const router = useRouter();

  const { videoRef, startCamera } = useCamera();
  const {
    currentIndex,
    capturedFaces,
    captureFace,
    isComplete,
  } = useScanner();

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    startCamera();
  }, []);

  const handleCapture = () => {
    if (!videoRef.current || !canvasRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    if (!ctx) return;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    ctx.drawImage(video, 0, 0);

    const grid = extractGridColors(
      ctx,
      canvas.width,
      canvas.height
    );

    captureFace(JSON.stringify(grid)); // store temporarily
  };

  const handleFinishScan = async () => {
  try {
    const faces = {
      U: [
        ["white", "white", "white"],
        ["white", "white", "white"],
        ["white", "white", "white"],
      ],

      R: [
        ["red", "red", "red"],
        ["red", "red", "red"],
        ["red", "red", "red"],
      ],

      F: [
        ["green", "green", "green"],
        ["green", "green", "green"],
        ["green", "green", "green"],
      ],

      D: [
        ["yellow", "yellow", "yellow"],
        ["yellow", "yellow", "yellow"],
        ["yellow", "yellow", "yellow"],
      ],

      L: [
        ["orange", "orange", "orange"],
        ["orange", "orange", "orange"],
        ["orange", "orange", "orange"],
      ],

      B: [
        ["blue", "blue", "blue"],
        ["blue", "blue", "blue"],
        ["blue", "blue", "blue"],
      ],
    };

    const result = await scanCube({ faces });

    console.log(result);

    localStorage.setItem("cubeString", result.cube);

    window.location.href = "/solve";
  } catch (error: any) {
  console.error("FULL ERROR:", error);

  if (error?.message) {
    alert(error.message);
  } else {
    alert(JSON.stringify(error));
  }
}
};

  return (
    <div className="flex flex-col items-center p-6">
      <FaceGuide currentIndex={currentIndex} />

      <div className="relative w-[320px] h-[240px]">
        <CameraView />
        <video ref={videoRef} className="hidden" />
        <GridOverlay />
      </div>

      <canvas ref={canvasRef} className="hidden" />

      <CaptureButton onClick={handleCapture} />

      <ScanProgress current={capturedFaces.length} />

      <FacePreview faces={capturedFaces} />

      {isComplete && (
        <button
          onClick={handleFinishScan}
          className="mt-4 px-6 py-3 bg-green-600 text-white rounded"
        >
          Solve Cube
        </button>
      )}
    </div>
  );
}