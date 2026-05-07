"use client";

import { useEffect, useState } from "react";

type UseAnimationProps = {
  moves: string[];
  speed?: number; // ms per move
};

export function useAnimation({ moves, speed = 800 }: UseAnimationProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const currentMove = moves[currentIndex] || null;

  // Auto play effect
  useEffect(() => {
    if (!isPlaying || moves.length === 0) return;

    if (currentIndex >= moves.length) {
      setIsPlaying(false);
      return;
    }

    const timer = setTimeout(() => {
      setCurrentIndex((prev) => prev + 1);
    }, speed);

    return () => clearTimeout(timer);
  }, [isPlaying, currentIndex, moves, speed]);

  // Controls
  const play = () => {
    if (moves.length === 0) return;
    setIsPlaying(true);
  };

  const pause = () => {
    setIsPlaying(false);
  };

  const reset = () => {
    setIsPlaying(false);
    setCurrentIndex(0);
  };

  const next = () => {
    setCurrentIndex((prev) =>
      Math.min(prev + 1, moves.length - 1)
    );
  };

  const prev = () => {
    setCurrentIndex((prev) =>
      Math.max(prev - 1, 0)
    );
  };

  return {
    currentIndex,
    currentMove,
    isPlaying,
    totalMoves: moves.length,

    // controls
    play,
    pause,
    reset,
    next,
    prev,
    setCurrentIndex, // optional manual control
  };
}