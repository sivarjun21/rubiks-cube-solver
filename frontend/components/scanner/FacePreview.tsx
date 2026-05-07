"use client";

type FacePreviewProps = {
  faces: string[]; // base64 images
};

const FACE_ORDER = ["U", "R", "F", "D", "L", "B"];

export default function FacePreview({ faces }: FacePreviewProps) {
  return (
    <div className="mt-6 w-full max-w-md">
      <h3 className="text-lg font-semibold mb-3 text-center">
        Captured Faces
      </h3>

      <div className="grid grid-cols-3 gap-3">
        {FACE_ORDER.map((face, index) => (
          <div
            key={face}
            className="flex flex-col items-center"
          >
            <div className="w-24 h-24 bg-gray-200 rounded overflow-hidden border">
              {faces[index] ? (
                <img
                  src={faces[index]}
                  alt={`Face ${face}`}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-500 text-sm">
                  -
                </div>
              )}
            </div>

            <span className="mt-1 text-sm font-medium">{face}</span>
          </div>
        ))}
      </div>
    </div>
  );
}