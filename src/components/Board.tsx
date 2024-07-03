import React from "react";
import { Stage, Layer } from "react-konva";
import { BOARD_HEIGHT, BOARD_WIDTH, CELL_SIZE } from "../config/app.config";
import { Cell, Direction, TetroCell, TetrominoType } from "../types";
import Tetromino from "./Tetromino";
import BoardCell from "./BoardCell";
import ClearingRow from "./ClearingRow";

type BoardProps = {
  cells: Cell[][];
  tetromino: TetrominoType;
  tetrominoDirection: Direction;
  tetrominoCol: number;
  tetrominoRow: number;
  clearningRows: number[];
  tetroDef?: TetroCell[][];
};

const Board: React.FC<BoardProps> = (props) => {
  const { cells, tetroDef, clearningRows } = props;

  return (
    <>
      <div>
        <Stage
          width={BOARD_WIDTH * CELL_SIZE}
          height={BOARD_HEIGHT * CELL_SIZE}
        >
          <Layer>
            {cells.map((row: Cell[], idY: number) => (
              <>
                {row.map((cell: Cell, idX: number) => (
                  <BoardCell
                    x={idX}
                    y={idY}
                    cellType={cell.shape}
                    isTetromino={false}
                  />
                ))}
              </>
            ))}
          </Layer>
          <Layer>{tetroDef && <Tetromino cells={tetroDef} />}</Layer>
          <Layer>
            {clearningRows &&
              clearningRows.map((idY) => <ClearingRow rowId={idY} />)}
          </Layer>
        </Stage>
      </div>
    </>
  );
};

export default Board;
