import React from "react";
import { Rect } from "react-konva";
import { CELL_SIZE, EMPTY_CELL_STROKE_WIDTH } from "../config/app.config";
import { Cell } from "../types";
import { Shapes } from "../config/shape.config";

type PropsType = {
  cell: Cell;
  isTetromino: boolean;
};

const BoardCell: React.FC<PropsType> = (props) => {
  return (
    <Rect
      x={props.cell.x * CELL_SIZE}
      y={props.cell.y * CELL_SIZE}
      height={CELL_SIZE}
      width={CELL_SIZE}
      stroke={!props.isTetromino ? "black" : undefined}
      strokeWidth={EMPTY_CELL_STROKE_WIDTH}
      fill={!!props.cell.shape ? Shapes[props.cell.shape].color : undefined}
    />
  );
};

export default BoardCell;
