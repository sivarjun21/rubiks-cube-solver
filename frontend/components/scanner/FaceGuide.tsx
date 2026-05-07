"use client";

type FaceGuideProps = {
  currentIndex: number;
};

const FACE_ORDER = ["U", "R", "F", "D", "L", "B"];

const FACE_LABELS: Record<string, string> = {
  U: "White (Top)",
  R: "Red (Right)",
  F: "Green (Front)",
  D: "Yellow (Bottom)",
  L: "Orange (Left)",
  B: "Blue (Back)",
};

export default function FaceGuide({ currentIndex }: FaceGuideProps) {
  const currentFace = FACE_ORDER[currentIndex];

  return (
    <div className="flex flex-col items-center text-center mb-4">
      {/* Current Face */}
      <h2 className="text-xl font-semibold">
        Scan Face: {currentFace}
      </h2>

      {/* Description */}
      <p className="text-gray-600 mt-1">
        Show the <span className="font-medium">{FACE_LABELS[currentFace]}</span> face to the camera
      </p>

      {/* Progress */}
      <div className="flex gap-2 mt-4">
        {FACE_ORDER.map((face, index) => (
          <div
            key={face}
            className={`w-8 h-8 flex items-center justify-center rounded 
              ${
                index === currentIndex
                  ? "bg-blue-600 text-white"
                  : index < currentIndex
                  ? "bg-green-500 text-white"
                  : "bg-gray-300 text-gray-700"
              }`}
          >
            {face}
          </div>
        ))}
      </div>
    </div>
  );
}