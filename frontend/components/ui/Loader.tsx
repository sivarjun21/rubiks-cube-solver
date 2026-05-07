"use client";

type LoaderProps = {
  size?: number; // px
  text?: string;
};

export default function Loader({
  size = 40,
  text,
}: LoaderProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-3">
      {/* Spinner */}
      <div
        className="border-4 border-gray-300 border-t-blue-600 rounded-full animate-spin"
        style={{
          width: size,
          height: size,
        }}
      />

      {/* Optional text */}
      {text && (
        <p className="text-sm text-gray-600">{text}</p>
      )}
    </div>
  );
}