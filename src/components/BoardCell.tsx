import React from "react";
import { Rect } from "react-konva";
import { CELL_SIZE, EMPTY_CELL_STROKE_WIDTH } from "../config/app.config";
import { Cell } from "../types";

type PropsType = {
  x: number;
  y: number;
  cell: Cell;
};

const BoardCell: React.FC<PropsType> = (props) => {
  return (
    <Rect
      x={props.x * CELL_SIZE}
      y={props.y * CELL_SIZE}
      height={CELL_SIZE}
      width={CELL_SIZE}
      stroke="black"
      strokeWidth={EMPTY_CELL_STROKE_WIDTH}
      fill={!!props.cell.shape ? "#0d83cd" : undefined}
    />
  );
};

export default BoardCell;
