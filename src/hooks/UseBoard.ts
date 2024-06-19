import {
  BOARD_HEIGHT,
  BOARD_WIDTH,
  TETROMINO_ENTER_COL,
  TETROMINO_ENTER_ROW,
} from "../config/app.config";
import { BoardState, Cell, CellTypes } from "../types";

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
    tetromino: CellTypes.I,
    tetrominoCol: TETROMINO_ENTER_COL,
    tetrominoRow: TETROMINO_ENTER_ROW,
  };
}
