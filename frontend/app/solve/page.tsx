"use client";

import { useEffect } from "react";

import { useSolver } from "@/hooks/useSolver";
import { useAnimation } from "@/hooks/useAnimation";

import MoveList from "@/components/solution/MoveList";
import MoveHighlighter from "@/components/solution/MoveHighlighter";
import StepController from "@/components/solution/StepController";
import Cube3D from "@/components/cube/Cube3D";

export default function SolvePage() {
  const { solveCube, moves, loading } = useSolver();
  const animation = useAnimation({ moves });

  useEffect(() => {
    const cube = localStorage.getItem("cubeString");

    if (cube) {
      solveCube(cube);
    }
  }, []);

  return (
    <div className="flex flex-col items-center p-6">
      <h1 className="text-2xl font-bold mb-4">
        Cube Solution
      </h1>

      {/* 3D Cube */}
      <Cube3D />

      {/* Current Move */}
      <MoveHighlighter
        currentMove={animation.currentMove || undefined}
        currentIndex={animation.currentIndex}
        totalMoves={animation.totalMoves}
      />

      {/* Controls */}
      <StepController
        currentIndex={animation.currentIndex}
        totalMoves={animation.totalMoves}
        onNext={animation.next}
        onPrev={animation.prev}
        onReset={animation.reset}
      />

      {/* Move List */}
      <MoveList
        moves={moves}
        currentIndex={animation.currentIndex}
      />

      {loading && <p className="mt-4">Solving...</p>}
    </div>
  );
}