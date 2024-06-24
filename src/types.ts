export enum TetrominoType {
  I = "I",
  L = "L",
  O = "O",
  S = "S",
}

export enum Direction {
  R = 0,
  U = 90,
  L = 180,
  D = 270,
}

// Cell type
// Cell type can be either null or any CellType.
// Color of the cell will be decided based on the CellType
export type Cell = {
  shape: TetrominoType | null;
  x: number;
  y: number;
};

// Board type
// Board has Shape which is moving
export type BoardState = {
  cells: Cell[][];
  tetromino: TetrominoType;
  tetrominoCol: number;
  tetrominoRow: number;
  tetrominoDirection: Direction;
};

export type Shape = {
  def: number[][];
};

export type ShapeObj = {
  [key in TetrominoType]: Shape;
};

export const Shapes: ShapeObj = {
  I: {
    def: [
      [1, 0, 0],
      [1, 0, 0],
      [1, 0, 0],
    ],
  },
  L: {
    def: [
      [1, 0, 0],
      [1, 0, 0],
      [1, 1, 0],
    ],
  },
  O: {
    def: [
      [1, 1, 0],
      [1, 1, 0],
      [0, 0, 0],
    ],
  },
  S: {
    def: [
      [1, 0, 0],
      [1, 1, 0],
      [0, 1, 0],
    ],
  },
};

export enum Action {
  start = "START",
  commit = "COMMIT",
  drop = "DROP",
  moveLeft = "LEFT",
  moveRight = "RIGHT",
  moveDown = "DOWN",
  rotate = "ROTATE",
}
