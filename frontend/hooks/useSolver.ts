"use client";

import { useState } from "react";

const API_URL = "http://127.0.0.1:8000/api/v1";

export function useSolver() {
  const [solution, setSolution] = useState<string | null>(null);
  const [moves, setMoves] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const solveCube = async (cube: string) => {
    setLoading(true);
    setError(null);
    setSolution(null);
    setMoves([]);

    try {
      const response = await fetch(`${API_URL}/solve`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ cube }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || "Failed to solve cube");
      }

      setSolution(data.solution);
      setMoves(data.moves);

      return data;
    } catch (err: any) {
      setError(err.message || "Something went wrong");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setSolution(null);
    setMoves([]);
    setError(null);
    setLoading(false);
  };

  return {
    solution,
    moves,
    loading,
    error,
    solveCube,
    reset,
  };
}