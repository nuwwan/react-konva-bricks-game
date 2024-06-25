import { Rect } from "react-konva";
import { Cell } from "../types";
import { CELL_SIZE } from "../config/app.config";

type PropType = {
  cells: Cell[][];
};

const Tetromino: React.FC<PropType> = (props) => {
  return (
    <>
      {props.cells.map((row: Cell[]) => (
        <>
          {row.map((cell: Cell) => (
            <Rect
              x={cell.x * CELL_SIZE}
              y={cell.y * CELL_SIZE}
              height={CELL_SIZE}
              width={CELL_SIZE}
              fill={!!cell.shape ? "#0d83cd" : undefined}
            />
          ))}
        </>
      ))}
    </>
  );
};

export default Tetromino;
