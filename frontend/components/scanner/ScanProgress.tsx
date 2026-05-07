"use client";

type ScanProgressProps = {
  current: number; // number of faces captured
  total?: number;  // default 6
};

export default function ScanProgress({
  current,
  total = 6,
}: ScanProgressProps) {
  const percentage = Math.min((current / total) * 100, 100);

  return (
    <div className="w-full max-w-md mt-4">
      {/* Text */}
      <div className="flex justify-between text-sm text-gray-600 mb-1">
        <span>Scanning Progress</span>
        <span>
          {current} / {total}
        </span>
      </div>

      {/* Progress Bar */}
      <div className="w-full h-3 bg-gray-300 rounded overflow-hidden">
        <div
          className="h-full bg-blue-600 transition-all duration-300"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}