import React, { useEffect, useState } from "react";
import { Stage, Layer, Rect } from "react-konva";
import { BOARD_HEIGHT, BOARD_WIDTH, CELL_SIZE } from "../config/app.config";
import { Cell, Direction, TetrominoType } from "../types";
import { getTetrominoDef } from "../utils/gameFunctions";

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
  }, []);

  useEffect(() => {
    console.log(cells);
  });
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
                  <Rect
                    x={idX * CELL_SIZE}
                    y={idY * CELL_SIZE}
                    height={CELL_SIZE}
                    width={CELL_SIZE}
                    stroke="black"
                  />
                ))}
              </>
            ))}
          </Layer>
        </Stage>
      </div>
    </>
  );
};

export default Board;
