import { Cell, Direction, TetroCell, TetrominoType } from "../types";
import { Shapes } from "../config/shape.config";
import { BOARD_HEIGHT, BOARD_WIDTH } from "../config/app.config";
/**
 * This function returns tetromino defination.
 * @returns Cell[3][3]
 */
export const getTetrominoDef = (
  tetromino: TetrominoType,
  direction: Direction,
  row: number,
  col: number
): TetroCell[][] => {
  // get the shape def
  const shapeDef = Shapes[tetromino].defs[direction];
  const tetrominoDef: TetroCell[][] = shapeDef.map((rowData, idy) =>
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
