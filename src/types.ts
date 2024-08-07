export enum TetrominoType {
  I = "I",
  L = "L",
  O = "O",
  S = "S",
  Z = "Z",
  T = "T",
}

export enum Direction {
  R = "R",
  U = "U",
  L = "L",
  D = "D",
}

// Cell type
// Cell type can be either null or any CellType.
// Color of the cell will be decided based on the CellType
export type Cell = {
  shape: TetrominoType | null;
};

export type TetroCell = Cell & {
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
  tetrominoQueue: TetrominoMetaType[];
};

export type Shape = {
  defs: { [key in Direction]: number[][] };
  color: string;
};

export type ShapeObj = {
  [key in TetrominoType]: Shape;
};

export enum Action {
  start = "START",
  end = "END",
  commit = "COMMIT",
  drop = "DROP",
  moveLeft = "LEFT",
  moveRight = "RIGHT",
  moveDown = "DOWN",
  rotate = "ROTATE",
  clearRow = "CLEAR",
}

export type TetrominoMetaType = {
  tetromino: TetrominoType;
  tetrominoCol: number;
  tetrominoRow: number;
  tetrominoDirection: Direction;
};
