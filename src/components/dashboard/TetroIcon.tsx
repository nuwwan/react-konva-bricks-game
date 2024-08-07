import { Rect } from "react-konva";
import { Direction, TetrominoType } from "../../types";
import { useEffect, useState } from "react";
import { Shapes } from "../../config/shape.config";
import { CELL_SIZE, EMPTY_CELL_STROKE_WIDTH } from "../../config/app.config";

const TETRO_ICON_CELL_SIZE = 20;

type PropType = {
  x: number;
  y: number;
  tetro: TetrominoType;
  direction: Direction;
};

const TetroIcon: React.FC<PropType> = (props) => {
  const [tetroDef, setTetroDef] = useState<number[][]>();

  useEffect(() => {
    setTetroDef(Shapes[props.tetro].defs[props.direction]);
  }, [props.tetro, props.direction]);

  return (
    <>
      {tetroDef?.map((row, y) =>
        row.map((c, x) => (
          <Rect
            x={props.x + x * CELL_SIZE}
            y={props.y + y * CELL_SIZE}
            width={CELL_SIZE}
            height={CELL_SIZE}
            fill={!!c ? Shapes[props.tetro].color : undefined}
            strokeWidth={EMPTY_CELL_STROKE_WIDTH}
            stroke={!!c ? "black" : undefined}
          />
        ))
      )}
    </>
  );
};

export default TetroIcon;
