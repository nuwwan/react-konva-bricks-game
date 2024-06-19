import { BOARD_HEIGHT, BOARD_WIDTH } from "../config/app.config";
import { BoardState, Cell } from "../types";

export function useBoard(): BoardState {
  const emptyCell: Cell = { shape: null };

  const constructEmptyBoard = (): Cell[][] => {
    const cells = Array(BOARD_HEIGHT)
      .fill(null)
      .map(() => Array(BOARD_WIDTH).fill(emptyCell));
    return cells;
  };

  return {
    cells: constructEmptyBoard(),
  };
}
