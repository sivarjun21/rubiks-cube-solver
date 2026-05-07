"use client";

type CaptureButtonProps = {
  onClick: () => void;
  disabled?: boolean;
  loading?: boolean;
  label?: string;
};

export default function CaptureButton({
  onClick,
  disabled = false,
  loading = false,
  label = "Capture",
}: CaptureButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      className={`
        mt-4 px-6 py-3 rounded-xl shadow font-medium
        bg-blue-600 text-white
        hover:bg-blue-700
        disabled:opacity-50 disabled:cursor-not-allowed
        transition
      `}
    >
      {loading ? "Capturing..." : label}
    </button>
  );
}