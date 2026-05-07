"use client";

type MoveHighlighterProps = {
  currentMove?: string;
  currentIndex?: number;
  totalMoves?: number;
};

export default function MoveHighlighter({
  currentMove,
  currentIndex = 0,
  totalMoves = 0,
}: MoveHighlighterProps) {
  return (
    <div className="mt-6 flex flex-col items-center">
      <h3 className="text-lg font-semibold mb-2">Current Move</h3>

      {/* Move Display */}
      <div className="text-4xl font-mono bg-blue-600 text-white px-8 py-4 rounded-xl shadow-lg transition">
        {currentMove || "-"}
      </div>

      {/* Step Info */}
      <p className="mt-2 text-sm text-gray-600">
        Step {totalMoves > 0 ? currentIndex + 1 : 0} / {totalMoves}
      </p>
    </div>
  );
}