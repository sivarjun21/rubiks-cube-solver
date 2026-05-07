"use client";

type CubeControlsProps = {
  onMove: (move: string) => void;
  disabled?: boolean;
};

const MOVES = [
  "U", "U'",
  "D", "D'",
  "L", "L'",
  "R", "R'",
  "F", "F'",
  "B", "B'",
];

export default function CubeControls({
  onMove,
  disabled = false,
}: CubeControlsProps) {
  return (
    <div className="mt-6 flex flex-col items-center">
      <h3 className="text-lg font-semibold mb-3">Manual Controls</h3>

      <div className="grid grid-cols-4 gap-2">
        {MOVES.map((move) => (
          <button
            key={move}
            onClick={() => onMove(move)}
            disabled={disabled}
            className="
              px-3 py-2 bg-gray-200 rounded-lg
              hover:bg-gray-300
              disabled:opacity-50 disabled:cursor-not-allowed
              font-mono
            "
          >
            {move}
          </button>
        ))}
      </div>
    </div>
  );
}