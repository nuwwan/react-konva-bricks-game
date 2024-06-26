import { ShapeObj } from "../types";
// A shape can be defined as a 2D arrayBuffer. Each element represents a brick
// in desired shapes.
// 1 : Brick is presented.
// 0 : Brick is not presented.

export const Shapes: ShapeObj = {
  I: {
    def: [
      [1, 0, 0],
      [1, 0, 0],
      [1, 0, 0],
    ],
    color: "#02B894",
  },
  L: {
    def: [
      [1, 0, 0],
      [1, 0, 0],
      [1, 1, 0],
    ],
    color: "#18A0FB",
  },
  O: {
    def: [
      [1, 1, 0],
      [1, 1, 0],
      [0, 0, 0],
    ],
    color: "#f96534",
  },
  S: {
    def: [
      [1, 0, 0],
      [1, 1, 0],
      [0, 1, 0],
    ],
    color: "#3579a3",
  },
};
