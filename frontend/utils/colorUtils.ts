// RGB type
type RGB = [number, number, number];

// Default cube colors (approximate)
const DEFAULT_COLORS: Record<string, RGB> = {
  white: [255, 255, 255],
  red: [200, 0, 0],
  green: [0, 150, 0],
  blue: [0, 0, 200],
  yellow: [255, 255, 0],
  orange: [255, 120, 0],
};

// Load calibration if exists
export function getCalibration(): Record<string, RGB> {
  try {
    const saved = localStorage.getItem("cubeCalibration");
    if (saved) {
      return JSON.parse(saved);
    }
  } catch {}
  return DEFAULT_COLORS;
}

// Euclidean distance between colors
function colorDistance(a: RGB, b: RGB): number {
  return Math.sqrt(
    (a[0] - b[0]) ** 2 +
    (a[1] - b[1]) ** 2 +
    (a[2] - b[2]) ** 2
  );
}

// Classify a pixel to nearest cube color
export function classifyColor(rgb: RGB): string {
  const calibration = getCalibration();

  let minDist = Infinity;
  let closestColor = "unknown";

  for (const color in calibration) {
    const dist = colorDistance(rgb, calibration[color]);
    if (dist < minDist) {
      minDist = dist;
      closestColor = color;
    }
  }

  return closestColor;
}

// Get average color from ImageData
export function getAverageColor(imageData: ImageData): RGB {
  let r = 0, g = 0, b = 0;

  const data = imageData.data;
  const pixelCount = data.length / 4;

  for (let i = 0; i < data.length; i += 4) {
    r += data[i];
    g += data[i + 1];
    b += data[i + 2];
  }

  return [
    Math.round(r / pixelCount),
    Math.round(g / pixelCount),
    Math.round(b / pixelCount),
  ];
}

// Convert canvas into 3x3 grid colors
export function extractGridColors(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number
): string[][] {
  const grid: string[][] = [];
  const cellW = width / 3;
  const cellH = height / 3;

  for (let row = 0; row < 3; row++) {
    const rowColors: string[] = [];

    for (let col = 0; col < 3; col++) {
      const x = col * cellW + cellW / 4;
      const y = row * cellH + cellH / 4;

      const sampleSize = Math.min(cellW, cellH) / 2;

      const imageData = ctx.getImageData(
        x,
        y,
        sampleSize,
        sampleSize
      );

      const avg = getAverageColor(imageData);
      const color = classifyColor(avg);

      rowColors.push(color);
    }

    grid.push(rowColors);
  }

  return grid;
}