import Link from "next/link";

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6 text-center">
      {/* Title */}
      <h1 className="text-4xl font-bold mb-4">
        Rubik&apos;s Cube Solver
      </h1>

      {/* Description */}
      <p className="text-lg text-gray-600 mb-8 max-w-xl">
        Scan your 3×3 Rubik&apos;s Cube using your camera and get the fastest
        solution with step-by-step animation.
      </p>

      {/* Buttons */}
      <div className="flex gap-4">
        <Link
          href="/scan"
          className="px-6 py-3 bg-blue-600 text-white rounded-xl shadow hover:bg-blue-700 transition"
        >
          Start Scanning
        </Link>

        <Link
          href="/solve"
          className="px-6 py-3 bg-gray-200 text-gray-800 rounded-xl shadow hover:bg-gray-300 transition"
        >
          Enter Manually
        </Link>
      </div>
    </div>
  );
}