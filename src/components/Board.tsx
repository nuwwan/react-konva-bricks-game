import React, { useEffect } from "react";
import { Stage, Layer, Rect } from "react-konva";
import { BOARD_HEIGHT, BOARD_WIDTH, CELL_SIZE } from "../config/app.config";
import { Cell } from "../types";
import { useBoard } from "../hooks/useBoard";

const Board: React.FC = () => {
  const { cells } = useBoard();

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
