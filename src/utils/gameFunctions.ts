import { Cell, Direction, Shapes, TetrominoType } from "../types";

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
  const shapeDef = Shapes[tetromino].def;
  const tetrominoDef: Cell[][] = shapeDef.map((rowData, idy) =>
    rowData.map((c, idx) => ({
      shape: !!c ? tetromino : null,
      x: col + idx,
      y: row + idy,
    }))
  );
  return tetrominoDef;
};
