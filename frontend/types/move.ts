import type { Face } from "./cube";

// Basic move notation (string form)
export type Move = string;

// Axis of rotation
export type Axis = "x" | "y" | "z";

// Direction of rotation
export type Direction = 1 | -1;

// Single move instruction (parsed form)
export type MoveInstruction = {
  face: Face;         // U, R, F, D, L, B
  axis: Axis;         // rotation axis
  layer: number;      // -1, 0, 1
  direction: Direction; // clockwise / counterclockwise
  turns: number;      // 1 (90°) or 2 (180°)
};

// Full move sequence
export type MoveSequence = Move[];

// Parsed instruction sequence
export type InstructionSequence = MoveInstruction[];

// Animation state
export type AnimationState = {
  currentIndex: number;
  isPlaying: boolean;
  speed: number; // ms per move
};

// Optional callback for move updates
export type OnMoveChange = (
  move: Move,
  index: number
) => void;