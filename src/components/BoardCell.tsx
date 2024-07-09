import React from "react";
import { Rect } from "react-konva";
import { CELL_SIZE, EMPTY_CELL_STROKE_WIDTH } from "../config/app.config";
import { TetrominoType } from "../types";
import { Shapes } from "../config/shape.config";

type PropsType = {
  cellType: TetrominoType | null;
  x: number;
  y: number;
  isTetromino: boolean;
};

const BoardCell: React.FC<PropsType> = (props) => {
  return (
    <Rect
      x={props.x * CELL_SIZE}
      y={props.y * CELL_SIZE}
      height={CELL_SIZE}
      width={CELL_SIZE}
      stroke={!props.cellType && props.isTetromino ? undefined : "black"}
      strokeWidth={EMPTY_CELL_STROKE_WIDTH}
      fill={!!props.cellType ? Shapes[props.cellType].color : undefined}
    />
  );
};

export default BoardCell;
