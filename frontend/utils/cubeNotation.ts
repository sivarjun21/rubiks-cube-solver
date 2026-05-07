// Allowed basic moves
export const BASIC_MOVES = ["U", "D", "L", "R", "F", "B"];

// Move type
export type Move = string;

// Parse solution string → array of moves
export function parseMoves(solution: string): Move[] {
  if (!solution) return [];

  return solution
    .trim()
    .split(/\s+/)
    .filter(Boolean);
}

// Validate move
export function isValidMove(move: string): boolean {
  const base = move.replace("'", "").replace("2", "");
  return BASIC_MOVES.includes(base);
}

// Normalize move (optional cleanup)
export function normalizeMove(move: string): Move {
  move = move.trim();

  if (!isValidMove(move)) {
    throw new Error(`Invalid move: ${move}`);
  }

  return move;
}

// Invert a move
export function invertMove(move: Move): Move {
  if (move.endsWith("'")) {
    return move.slice(0, -1);
  }

  if (move.endsWith("2")) {
    return move; // 180° stays same
  }

  return move + "'";
}

// Invert entire sequence
export function invertSequence(moves: Move[]): Move[] {
  return moves
    .slice()
    .reverse()
    .map(invertMove);
}

// Expand moves (handle "R2" → ["R", "R"])
export function expandMoves(moves: Move[]): Move[] {
  const expanded: Move[] = [];

  for (const move of moves) {
    if (move.endsWith("2")) {
      const base = move[0];
      expanded.push(base, base);
    } else {
      expanded.push(move);
    }
  }

  return expanded;
}