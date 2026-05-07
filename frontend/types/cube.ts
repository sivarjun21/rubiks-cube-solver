// Basic cube face identifiers
export type Face = "U" | "R" | "F" | "D" | "L" | "B";

// Allowed colors
export type CubeColor =
  | "white"
  | "red"
  | "green"
  | "yellow"
  | "orange"
  | "blue";

// 3x3 grid for a face
export type FaceGrid = CubeColor[][];

// Full cube faces structure
export type CubeFaces = {
  U: FaceGrid;
  R: FaceGrid;
  F: FaceGrid;
  D: FaceGrid;
  L: FaceGrid;
  B: FaceGrid;
};

// Cube string format (54 chars)
export type CubeString = string;

// Cubie position in 3D space
export type Position = {
  x: number; // -1, 0, 1
  y: number; // -1, 0, 1
  z: number; // -1, 0, 1
};

// Cubie (small cube)
export type Cubie = {
  id: string;
  position: Position;
  colors: Partial<Record<Face, CubeColor>>;
};

// Full cube state (used in animation)
export type CubeState = {
  cubies: Cubie[];
};