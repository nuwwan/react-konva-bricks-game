import { useEffect, useState } from "react";
import {
  Action,
  BoardState,
  Cell,
  TetrominoType,
  Direction,
  Shape,
  ShapeObj,
  Shapes,
} from "../types";
import { useBoardState } from "./useBoardStatus";
import { useInterval } from "./useInterval";
import { getTetrominoDef } from "../utils/gameFunctions";

type TatrisBoard = BoardState & {
  score: number;
  isPlaying: boolean;
  setIsPlaying: (flag: boolean) => void;
};

export function useBoard(): TatrisBoard {
  const [score, setScore] = useState<number>(0);
  const [isCommiting, setIsCommiting] = useState<boolean>(false);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [tetromino, setTetromino] = useState<TetrominoType>(TetrominoType.I);

  const [boardState, dispatchBoardState] = useBoardState();

  const handleTick = () => {
    if (!isPlaying) {
      return;
    }
    return handleDrop();
  };
  useInterval(handleTick, 1000);
  useEffect(() => {}, []);

  const handleDrop = (): void => {
    const { cells, tetromino, tetrominoCol, tetrominoRow, tetrominoDirection } =
      boardState;
    const boardAfterDrop: BoardState = {
      cells,
      tetromino,
      tetrominoCol: tetrominoCol + 1,
      tetrominoRow,
      tetrominoDirection,
    };
    if (!isCollide(boardAfterDrop)) {
      dispatchBoardState({ type: Action.drop });
    } else {
      dispatchBoardState({ type: Action.commit });
    }
  };

  /**
   * Start the Game
   */
  const startGame = () => {
    // add shape to board,
    const newTetromino: TetrominoType = getRandomShape();
    setTetromino(newTetromino);
    setIsPlaying(true);
    dispatchBoardState({ type: Action.start });
  };

  const getRandomShape = (): TetrominoType => {
    const randomId: number = Math.floor(
      Math.random() * Object.keys(TetrominoType).length
    );
    return TetrominoType[
      Object.keys(TetrominoType)[randomId] as keyof typeof TetrominoType
    ];
  };

  return {
    score: score,
    ...boardState,
    isPlaying: isPlaying,
    setIsPlaying: setIsPlaying,
  };
}

/**
 * Check tetromino collides with board cells
 */
const isCollide = (board: BoardState): boolean => {
  const { cells, tetromino, tetrominoCol, tetrominoRow, tetrominoDirection } =
    board;
  const tetrominoDef: Cell[][] = getTetrominoDef(
    tetromino,
    tetrominoDirection,
    tetrominoRow,
    tetrominoCol
  );
  return tetrominoDef.every((row) =>
    row.every((c) => !!c.shape && cells[c.y][c.x].shape == null)
  );
};
