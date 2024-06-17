export enum CellValues {
  I = "I",
  L = "L",
  O = "O",
  S = "S",
}

// Cell type
export type Cell = {
  value: 0 | 1;
  shape: CellValues | null;
};

// Board type
export type BoardState = {
  cells: Cell[][];
};
