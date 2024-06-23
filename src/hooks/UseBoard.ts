import { useEffect, useState } from "react";
import { BoardState, Cell, CellType, Shape, ShapeObj, Shapes } from "../types";
import { useBoardState } from "./useBoardStatus";

type TatrisBoard = BoardState & {
  score: number;
};

export function useBoard(): TatrisBoard {
  const [score, setScore] = useState<number>(0);
  const [isCommiting, setIsCommiting] = useState<boolean>(false);
  const [isGameStarted, setIsGameStarted] = useState<boolean>(false);

  const [boardState, dispatchBoardState] = useBoardState();

  useEffect(() => {}, []);

  const handleGame = (): void => {
    const { cells, tetromino, tetrominoCol, tetrominoRow } = boardState;
    if (isGameStarted) {
      // add shape to board,
      const newShapeType: CellType = getRandomShape();
      const newShape: Shape = Shapes[newShapeType];
    }
  };

  const getRandomShape = (): CellType => {
    const randomId: number = Math.floor(
      Math.random() * Object.keys(CellType).length
    );
    return CellType[Object.keys(CellType)[randomId] as keyof typeof CellType];
  };

  return { score: score, ...boardState };
}
