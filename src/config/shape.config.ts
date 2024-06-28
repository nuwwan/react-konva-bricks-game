import { Direction, ShapeObj } from "../types";
// A shape can be defined as a 2D arrayBuffer. Each element represents a brick
// in desired shapes.
// 1 : Brick is presented.
// 0 : Brick is not presented.

export const Shapes: ShapeObj = {
  I: {
    defs: {
      [Direction.H]: [
        [1, 0, 0],
        [1, 0, 0],
        [1, 0, 0],
      ],
      [Direction.V]: [
        [1, 1, 1],
        [0, 0, 0],
        [0, 0, 0],
      ],
    },
    color: "#02B894",
  },
  L: {
    defs: {
      [Direction.H]: [
        [1, 0, 0],
        [1, 0, 0],
        [1, 1, 0],
      ],
      [Direction.V]: [
        [0, 0, 1],
        [1, 1, 1],
        [0, 0, 0],
      ],
    },
    color: "#18A0FB",
  },
  O: {
    defs: {
      [Direction.H]: [
        [1, 1, 0],
        [1, 1, 0],
        [0, 0, 0],
      ],
      [Direction.V]: [
        [1, 1, 0],
        [1, 1, 0],
        [0, 0, 0],
      ],
    },
    color: "#f96534",
  },
  S: {
    defs: {
      [Direction.H]: [
        [1, 0, 0],
        [1, 1, 0],
        [0, 1, 0],
      ],
      [Direction.V]: [
        [0, 1, 1],
        [1, 1, 0],
        [0, 0, 0],
      ],
    },
    color: "#3579a3",
  },
  Z: {
    defs: {
      [Direction.H]: [
        [0, 1, 0],
        [1, 1, 0],
        [1, 0, 0],
      ],
      [Direction.V]: [
        [1, 1, 0],
        [0, 1, 0],
        [0, 1, 1],
      ],
    },
    color: "red",
  },
};
