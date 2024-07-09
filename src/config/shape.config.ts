import { Direction, ShapeObj } from "../types";
// A shape can be defined as a 2D arrayBuffer. Each element represents a brick
// in desired shapes.
// 1 : Brick is presented.
// 0 : Brick is not presented.

export const Shapes: ShapeObj = {
  I: {
    defs: {
      [Direction.R]: [
        [1, 1, 1],
        [0, 0, 0],
        [0, 0, 0],
      ],
      [Direction.U]: [
        [1, 0, 0],
        [1, 0, 0],
        [1, 0, 0],
      ],
      [Direction.L]: [
        [1, 1, 1],
        [0, 0, 0],
        [0, 0, 0],
      ],
      [Direction.D]: [
        [1, 0, 0],
        [1, 0, 0],
        [1, 0, 0],
      ],
    },
    color: "#02B894",
  },
  L: {
    defs: {
      [Direction.R]: [
        [1, 1, 1],
        [1, 0, 0],
        [0, 0, 0],
      ],
      [Direction.U]: [
        [1, 0, 0],
        [1, 0, 0],
        [1, 1, 0],
      ],
      [Direction.L]: [
        [0, 0, 1],
        [1, 1, 1],
        [0, 0, 0],
      ],
      [Direction.D]: [
        [1, 1, 0],
        [0, 1, 0],
        [0, 1, 0],
      ],
    },
    color: "#18A0FB",
  },
  O: {
    defs: {
      [Direction.R]: [
        [1, 1, 0],
        [1, 1, 0],
        [0, 0, 0],
      ],
      [Direction.U]: [
        [1, 1, 0],
        [1, 1, 0],
        [0, 0, 0],
      ],
      [Direction.L]: [
        [1, 1, 0],
        [1, 1, 0],
        [0, 0, 0],
      ],
      [Direction.D]: [
        [1, 1, 0],
        [1, 1, 0],
        [0, 0, 0],
      ],
    },
    color: "#f96534",
  },
  S: {
    defs: {
      [Direction.R]: [
        [0, 1, 1],
        [1, 1, 0],
        [0, 0, 0],
      ],
      [Direction.U]: [
        [1, 0, 0],
        [1, 1, 0],
        [0, 1, 0],
      ],
      [Direction.L]: [
        [0, 1, 1],
        [1, 1, 0],
        [0, 0, 0],
      ],
      [Direction.D]: [
        [1, 0, 0],
        [1, 1, 0],
        [0, 1, 0],
      ],
    },
    color: "#3579a3",
  },
  Z: {
    defs: {
      [Direction.R]: [
        [1, 1, 0],
        [0, 1, 1],
        [0, 0, 0],
      ],
      [Direction.U]: [
        [0, 1, 0],
        [1, 1, 0],
        [1, 0, 0],
      ],
      [Direction.L]: [
        [1, 1, 0],
        [0, 1, 1],
        [0, 0, 0],
      ],
      [Direction.D]: [
        [0, 1, 0],
        [1, 1, 0],
        [1, 0, 0],
      ],
    },
    color: "#b549fd",
  },
  T: {
    defs: {
      [Direction.R]: [
        [0, 1, 0],
        [1, 1, 0],
        [0, 1, 0],
      ],
      [Direction.U]: [
        [1, 1, 1],
        [0, 1, 0],
        [0, 0, 0],
      ],
      [Direction.L]: [
        [1, 0, 0],
        [1, 1, 0],
        [1, 0, 0],
      ],
      [Direction.D]: [
        [0, 1, 0],
        [1, 1, 1],
        [0, 0, 0],
      ],
    },
    color: "#fdf149",
  },
};
