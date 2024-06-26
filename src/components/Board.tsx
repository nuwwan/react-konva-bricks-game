import React, { useEffect, useState } from "react";
import { Stage, Layer, Rect } from "react-konva";
import { BOARD_HEIGHT, BOARD_WIDTH, CELL_SIZE } from "../config/app.config";
import { Cell, Direction, TetrominoType } from "../types";
import { getTetrominoDef } from "../utils/gameFunctions";
import Tetromino from "./Tetromino";
import BoardCell from "./BoardCell";

type BoardProps = {
  cells: Cell[][];
  tetromino: TetrominoType;
  tetrominoDirection: Direction;
  tetrominoCol: number;
  tetrominoRow: number;
};

const Board: React.FC<BoardProps> = (props) => {
  const { cells, tetromino, tetrominoDirection, tetrominoCol, tetrominoRow } =
    props;

  const [tetrominoDef, setTetrominoDef] = useState<Cell[][] | null>(null);

  useEffect(() => {
    const tetrisDef = getTetrominoDef(
      tetromino,
      tetrominoDirection,
      tetrominoRow,
      tetrominoCol
    );
    setTetrominoDef(tetrisDef);
  }, [tetromino, tetrominoRow, tetrominoCol, tetrominoDirection]);

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
                  <BoardCell cell={cell} isTetromino={false}/>
                ))}
              </>
            ))}
          </Layer>
          <Layer>{tetrominoDef && <Tetromino cells={tetrominoDef} />}</Layer>
        </Stage>
      </div>
    </>
  );
};

export default Board;
