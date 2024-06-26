import { Rect } from "react-konva";
import { Cell } from "../types";
import { CELL_SIZE } from "../config/app.config";
import BoardCell from "./BoardCell";

type PropType = {
  cells: Cell[][];
};

const Tetromino: React.FC<PropType> = (props) => {
  return (
    <>
      {props.cells.map((row: Cell[]) => (
        <>
          {row.map((cell: Cell) => (
            <BoardCell cell={cell} isTetromino={true}/>
          ))}
        </>
      ))}
    </>
  );
};

export default Tetromino;
