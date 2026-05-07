"use client";

type MoveListProps = {
  moves: string[];
  currentIndex?: number; // highlight current move
};

export default function MoveList({
  moves,
  currentIndex = -1,
}: MoveListProps) {
  return (
    <div className="mt-6 w-full max-w-xl">
      <h3 className="text-lg font-semibold mb-3 text-center">
        Solution Moves
      </h3>

      <div className="flex flex-wrap gap-2 justify-center bg-gray-100 p-4 rounded-lg max-h-48 overflow-y-auto">
        {moves.map((move, index) => (
          <span
            key={index}
            className={`
              px-3 py-1 rounded font-mono transition
              ${
                index === currentIndex
                  ? "bg-blue-600 text-white scale-110"
                  : "bg-gray-300 text-gray-800"
              }
            `}
          >
            {move}
          </span>
        ))}
      </div>
    </div>
  );
}