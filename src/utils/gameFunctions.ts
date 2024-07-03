import { Cell, Direction, TetroCell, TetrominoType } from "../types";
import { Shapes } from "../config/shape.config";
import {
  BOARD_HEIGHT,
  BOARD_WIDTH,
  TETROMINO_ENTER_COL,
  TETROMINO_ENTER_ROW,
} from "../config/app.config";

/**
 * Returns random Tetromino
 * @returns TetrominoType
 */
export const getRandomTetromino = (): TetrominoType => {
  const randomId: number = Math.floor(
    Math.random() * Object.keys(TetrominoType).length
  );
  return TetrominoType[
    Object.keys(TetrominoType)[randomId] as keyof typeof TetrominoType
  ];
};

/**
 * Get Random Direction
 * @returns Direction
 */

export const getRandomDirection = (): Direction => {
  const randomId: number = Math.floor(
    Math.random() * Object.keys(Direction).length
  );
  return Direction[Object.keys(Direction)[randomId] as keyof typeof Direction];
};

/**
 * Returns the IDs of the Rows going to be cleared
 * @param cells
 * @returns rowIDs
 */
export const getCompletedRows = (cells: Cell[][]): number[] => {
  const completedRowsIDs: number[] = [];
  for (let y = 0; y < BOARD_HEIGHT; y++) {
    if (cells[y].every((c) => c.shape)) {
      completedRowsIDs.push(y);
    }
  }
  return completedRowsIDs;
};

/**
 * This function will return row of empty cells.
 * Length will be the BOARD_WIDTH
 * @returns
 */
export const getEmptyCellRow = (): Cell[] => {
  return Array(BOARD_WIDTH)
    .fill(null)
    .map(() => ({ shape: null }));
};

export const getRandomTetro = (): TetroCell[][] => {
  // 1. Get random tetro type
  const tetroType: TetrominoType = getRandomTetromino();
  // 2. Get random direction
  const randomDirection: Direction = getRandomDirection();
  // 3. Get shape
  const shape: number[][] = Shapes[tetroType].defs[randomDirection];
  // 3. Get tetro definition
  return shape.map((row, idY) =>
    row.map((c, idX) => ({
      x: TETROMINO_ENTER_COL + idX,
      y: TETROMINO_ENTER_ROW + idY,
      shape: c ? tetroType : null,
    }))
  );
};

/**
 * Returns Tetro for given params
 * @param x
 * @param y
 * @param tetroType
 * @param direction
 * @returns
 */
export const getTetroDefFor = (
  x: number,
  y: number,
  tetroType: TetrominoType,
  direction: Direction
): TetroCell[][] => {
  const shape: number[][] = Shapes[tetroType].defs[direction];
  return shape.map((row, idY) =>
    row.map((c, idX) => ({
      x: x + idX,
      y: y + idY,
      shape: c ? tetroType : null,
    }))
  );
};

/**
 * Return the adjucent next direction for a given direction
 * @param currentDirection
 * @returns
 */
export const getRotatedTetroDirection = (
  currentDirection: Direction
): Direction => {
  return currentDirection === Direction.R
    ? Direction.U
    : currentDirection === Direction.U
    ? Direction.L
    : currentDirection === Direction.L
    ? Direction.D
    : Direction.R;
};
