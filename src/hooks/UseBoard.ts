import { useEffect, useRef, useState } from "react";
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
import { getRandomTetromino, getTetrominoDef } from "../utils/gameFunctions";
import { BOARD_HEIGHT, TICK_SPEED } from "../config/app.config";

type TatrisBoard = BoardState & {
  score: number;
  startGame: () => void;
  isPlaying: boolean;
  setIsPlaying: (flag: boolean) => void;
};

export function useBoard(): TatrisBoard {
  const [score, setScore] = useState<number>(0);
  const [isCommiting, setIsCommiting] = useState<boolean>(false);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [tetromino, setTetromino] = useState<TetrominoType>(TetrominoType.I);
  const [tickSpeed, setTickSpeed] = useState<TICK_SPEED>(TICK_SPEED.normal);
  const [isLeftKeyDown, setIsLeftKeyDown] = useState(false);
  const [isRightKeyDown, setIsRightKeyDown] = useState(false);
  const sideBtnIntervalRef = useRef<any>(null);

  const [boardState, dispatchBoardState] = useBoardState();

  const handleDrop = (): void => {
    const { cells, tetromino, tetrominoCol, tetrominoRow, tetrominoDirection } =
      boardState;
    const boardAfterDrop: BoardState = {
      cells,
      tetromino,
      tetrominoCol,
      tetrominoRow: tetrominoRow + 1,
      tetrominoDirection,
    };
    if (!isCollide(boardAfterDrop)) {
      dispatchBoardState({ type: Action.drop });
    } else {
      dispatchBoardState({ type: Action.commit });
    }
  };

  const handleTick = () => {
    if (!isPlaying) {
      return;
    }
    return handleDrop();
  };

  useInterval(handleTick, tickSpeed);

  const handleSideBtnEvent = () => {
    if (isRightKeyDown) {
      dispatchBoardState({ type: Action.moveRight });
    } else if (isLeftKeyDown) {
      dispatchBoardState({ type: Action.moveLeft });
    }
  };

  useEffect(() => {
    if ((isRightKeyDown || isLeftKeyDown) && !sideBtnIntervalRef.current) {
      sideBtnIntervalRef.current = setInterval(handleSideBtnEvent, 300);
    } else if (
      !isRightKeyDown &&
      !isLeftKeyDown &&
      sideBtnIntervalRef.current
    ) {
      clearInterval(sideBtnIntervalRef.current);
      sideBtnIntervalRef.current = null;
    }
    return () => {
      if (sideBtnIntervalRef.current) {
        sideBtnIntervalRef.current = null;
      }
    };
  }, [isRightKeyDown, isLeftKeyDown]);

  /**
   * This useEffect registers the event listeners
   */
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowDown") {
        setTickSpeed(TICK_SPEED.fast);
      }
      if (event.key === "ArrowUp") {
      }
      if (event.key === "ArrowLeft") {
        setIsLeftKeyDown(true);
      }
      if (event.key === "ArrowRight") {
        setIsRightKeyDown(true);
      }
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      if (event.key === "ArrowDown") {
        setTickSpeed(TICK_SPEED.normal);
      }
      if (event.key === "ArrowUp") {
      }
      if (event.key === "ArrowLeft") {
        setIsLeftKeyDown(false);
      }
      if (event.key === "ArrowRight") {
        setIsRightKeyDown(false);
      }
    };
    // register event listeners
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  /**
   * Start the Game
   */
  const startGame = () => {
    // add shape to board,
    const newTetromino: TetrominoType = getRandomTetromino();
    setTetromino(newTetromino);
    setIsPlaying(true);
    dispatchBoardState({ type: Action.start });
  };

  return {
    score: score,
    ...boardState,
    isPlaying: isPlaying,
    setIsPlaying: setIsPlaying,
    startGame: startGame,
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
  return tetrominoDef.some((row) =>
    row.some((c) =>
      !!c.shape && c.y == BOARD_HEIGHT
        ? !!c.shape && c.y == BOARD_HEIGHT
        : !!c.shape && cells[c.y][c.x].shape != null
    )
  );
};
