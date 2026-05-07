export type Axis = "x" | "y" | "z";

export type MoveInstruction = {
  face: string;        // U, D, L, R, F, B
  axis: Axis;          // rotation axis
  layer: number;       // which slice (-1, 0, 1)
  direction: 1 | -1;   // clockwise / counterclockwise
  turns: number;       // 1 or 2 (for 180°)
};

// Map each face to axis + layer
const MOVE_MAP: Record<
  string,
  { axis: Axis; layer: number; direction: 1 | -1 }
> = {
  U: { axis: "y", layer: 1, direction: 1 },
  D: { axis: "y", layer: -1, direction: -1 },
  R: { axis: "x", layer: 1, direction: 1 },
  L: { axis: "x", layer: -1, direction: -1 },
  F: { axis: "z", layer: 1, direction: 1 },
  B: { axis: "z", layer: -1, direction: -1 },
};

// Parse a single move (e.g., "R", "R'", "R2")
export function parseMove(move: string): MoveInstruction {
  const base = move[0]; // R, U, etc.

  if (!MOVE_MAP[base]) {
    throw new Error(`Invalid move: ${move}`);
  }

  const { axis, layer, direction } = MOVE_MAP[base];

  let finalDirection = direction;
  let turns = 1;

  // Handle prime (')
  if (move.includes("'")) {
    finalDirection = (direction * -1) as 1 | -1;
  }

  // Handle double turn (2)
  if (move.includes("2")) {
    turns = 2;
  }

  return {
    face: base,
    axis,
    layer,
    direction: finalDirection,
    turns,
  };
}

// Parse full move list
export function parseMoveSequence(moves: string[]): MoveInstruction[] {
  return moves.map(parseMove);
}