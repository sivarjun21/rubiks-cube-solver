"use client";

import { useState } from "react";

const FACE_ORDER = ["U", "R", "F", "D", "L", "B"];

export function useScanner() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [capturedFaces, setCapturedFaces] = useState<string[]>([]);

  // Capture a face (base64 image)
  const captureFace = (image: string) => {
    if (currentIndex >= FACE_ORDER.length) return;

    setCapturedFaces((prev) => {
      const updated = [...prev];
      updated[currentIndex] = image;
      return updated;
    });

    // Move to next face
    if (currentIndex < FACE_ORDER.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  // Go back one step
  const goBack = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  // Reset scanning
  const reset = () => {
    setCapturedFaces([]);
    setCurrentIndex(0);
  };

  const isComplete = capturedFaces.filter(Boolean).length === 6;

  return {
    FACE_ORDER,
    currentIndex,
    currentFace: FACE_ORDER[currentIndex],
    capturedFaces,
    captureFace,
    goBack,
    reset,
    isComplete,
  };
}