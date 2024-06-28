import { Cell, Direction, TetrominoType } from "../types";
import { Shapes } from "../config/shape.config";
/**
 * This function returns tetromino defination.
 * @returns Cell[3][3]
 */
export const getTetrominoDef = (
  tetromino: TetrominoType,
  direction: Direction,
  row: number,
  col: number
): Cell[][] => {
  // get the shape def
  const shapeDef = Shapes[tetromino].defs[direction];
  const tetrominoDef: Cell[][] = shapeDef.map((rowData, idy) =>
    rowData.map((c, idx) => ({
      shape: !!c ? tetromino : null,
      x: col + idx,
      y: row + idy,
    }))
  );
  return tetrominoDef;
};

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
