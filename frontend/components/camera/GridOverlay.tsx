"use client";

type GridOverlayProps = {
  gridSize?: number;   // default 3x3
  color?: string;      // border color
  thickness?: number;  // border thickness
};

export default function GridOverlay({
  gridSize = 3,
  color = "border-green-400",
  thickness = 2,
}: GridOverlayProps) {
  const cells = Array.from({ length: gridSize * gridSize });

  return (
    <div className="absolute inset-0 pointer-events-none">
      <div
        className={`grid w-full h-full`}
        style={{
          gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
          gridTemplateRows: `repeat(${gridSize}, 1fr)`,
        }}
      >
        {cells.map((_, index) => (
          <div
            key={index}
            className={`${color}`}
            style={{
              borderWidth: thickness,
              borderStyle: "solid",
            }}
          />
        ))}
      </div>
    </div>
  );
}