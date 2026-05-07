import type { CubeColor, Face } from "./cube";

// 3x3 grid of colors for one face
export type FaceGrid = CubeColor[][];

// Full scan result (all 6 faces)
export type ScanFaces = {
  U: FaceGrid;
  R: FaceGrid;
  F: FaceGrid;
  D: FaceGrid;
  L: FaceGrid;
  B: FaceGrid;
};

// Partial scan state (during scanning)
export type PartialScan = Partial<Record<Face, FaceGrid>>;

// Raw captured image (base64)
export type CapturedImage = string;

// Scan step state
export type ScanState = {
  currentFace: Face;
  currentIndex: number;
  capturedImages: CapturedImage[];
  faces?: PartialScan;
  isComplete: boolean;
};

// Scan API request
export type ScanRequest = {
  faces: ScanFaces;
};

// Scan API response
export type ScanResponse = {
  success: boolean;
  cube: string; // 54-character cube string
};