import { useEffect, useState } from "react";
import { BoardState, Cell, CellType, Shape, ShapeObj, Shapes } from "../types";
import { useBoardState } from "./useBoardStatus";

type TatrisBoard = BoardState & {
  score: number;
};

export function useBoard(): TatrisBoard {
  const [score, setScore] = useState<number>(0);
  const [isCommiting, setIsCommiting] = useState<boolean>(false);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [tetromino, setTetromino] = useState<CellType>(CellType.I);

  const [boardState, dispatchBoardState] = useBoardState();

  useEffect(() => {}, []);

  const handleGame = (): void => {
    const { cells, tetromino, tetrominoCol, tetrominoRow } = boardState;
    /**
     * Game is started event
     */
    if (!isPlaying) {
      // add shape to board,
      const newTetromino: CellType = getRandomShape();
      setTetromino(newTetromino)
      setIsPlaying(true)
    }


  };

  const SstartGame=()=>{
    
  }

  const getRandomShape = (): CellType => {
    const randomId: number = Math.floor(
      Math.random() * Object.keys(CellType).length
    );
    return CellType[Object.keys(CellType)[randomId] as keyof typeof CellType];
  };

  return { score: score, ...boardState };
}
