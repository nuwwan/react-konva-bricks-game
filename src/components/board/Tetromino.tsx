import { TetroCell } from "../../types";
import BoardCell from "./BoardCell";

type PropType = {
  cells: TetroCell[][];
};

const Tetromino: React.FC<PropType> = (props) => {
  return (
    <>
      {props.cells.map((row: TetroCell[]) => (
        <>
          {row.map((cell: TetroCell) => (
            <BoardCell
              x={cell.x}
              y={cell.y}
              cellType={cell.shape}
              isTetromino={true}
            />
          ))}
        </>
      ))}
    </>
  );
};

export default Tetromino;
