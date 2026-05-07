"use client";

type StepControllerProps = {
  currentIndex: number;
  totalMoves: number;
  onNext: () => void;
  onPrev: () => void;
  onReset: () => void;
};

export default function StepController({
  currentIndex,
  totalMoves,
  onNext,
  onPrev,
  onReset,
}: StepControllerProps) {
  const isFirst = currentIndex <= 0;
  const isLast = currentIndex >= totalMoves - 1;

  return (
    <div className="mt-6 flex flex-col items-center">
      <h3 className="text-lg font-semibold mb-3">Step Controls</h3>

      <div className="flex gap-3">
        {/* Previous */}
        <button
          onClick={onPrev}
          disabled={isFirst}
          className="px-4 py-2 bg-gray-400 text-white rounded disabled:opacity-50"
        >
          Prev
        </button>

        {/* Next */}
        <button
          onClick={onNext}
          disabled={isLast}
          className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
        >
          Next
        </button>

        {/* Reset */}
        <button
          onClick={onReset}
          className="px-4 py-2 bg-red-500 text-white rounded"
        >
          Reset
        </button>
      </div>

      {/* Status */}
      <p className="mt-2 text-sm text-gray-600">
        Step {totalMoves > 0 ? currentIndex + 1 : 0} / {totalMoves}
      </p>
    </div>
  );
}