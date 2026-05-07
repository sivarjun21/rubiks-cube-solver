"use client";

import { useEffect, useState } from "react";

type MoveAnimatorProps = {
  moves: string[];
  onMoveChange?: (move: string, index: number) => void;
  speed?: number; // ms per move
};

export default function MoveAnimator({
  moves,
  onMoveChange,
  speed = 800,
}: MoveAnimatorProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (!isPlaying || moves.length === 0) return;

    if (currentIndex >= moves.length) {
      setIsPlaying(false);
      return;
    }

    const move = moves[currentIndex];

    // Notify parent (Cube3D will react here later)
    onMoveChange?.(move, currentIndex);

    const timer = setTimeout(() => {
      setCurrentIndex((prev) => prev + 1);
    }, speed);

    return () => clearTimeout(timer);
  }, [isPlaying, currentIndex, moves, speed, onMoveChange]);

  const start = () => {
    setCurrentIndex(0);
    setIsPlaying(true);
  };

  const pause = () => {
    setIsPlaying(false);
  };

  const reset = () => {
    setIsPlaying(false);
    setCurrentIndex(0);
  };

  return (
    <div className="mt-6 flex flex-col items-center">
      <h3 className="text-lg font-semibold mb-3">Move Animator</h3>

      {/* Controls */}
      <div className="flex gap-3 mb-4">
        <button
          onClick={start}
          className="px-4 py-2 bg-green-600 text-white rounded"
        >
          Start
        </button>

        <button
          onClick={pause}
          className="px-4 py-2 bg-yellow-500 text-white rounded"
        >
          Pause
        </button>

        <button
          onClick={reset}
          className="px-4 py-2 bg-gray-500 text-white rounded"
        >
          Reset
        </button>
      </div>

      {/* Current Move */}
      <div className="text-xl font-mono bg-gray-200 px-4 py-2 rounded">
        {moves[currentIndex] || "-"}
      </div>

      {/* Progress */}
      <div className="mt-2 text-sm text-gray-600">
        Step {Math.min(currentIndex + 1, moves.length)} / {moves.length}
      </div>
    </div>
  );
}