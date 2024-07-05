import { useEffect, useRef, useState } from "react";
import { Action, BoardState, TetroCell } from "../types";
import {
  BOARD_WIDTH,
  CELL_BREAK_SCORE,
  TICK_SPEED,
} from "../config/app.config";
import { useInterval } from "./useInterval";
import { getCompletedRows, getTetroDefFor } from "../utils/gameFunctions";
import { useBoardState } from "./useBoardState";

type TatrisBoardProps = BoardState & {
  score: number;
  startGame: () => void;
  isPlaying: boolean;
  isGameEnd: boolean;
  togglePlayPause: () => void;
  clearedRows: number[];
  tetro?: TetroCell[][];
};

export function useBoard(): TatrisBoardProps {
  const [boardState, dispatchBoardState] = useBoardState();
  const {
    cells,
    tetromino,
    tetrominoCol,
    tetrominoRow,
    tetrominoDirection,
    tetrominoQueue,
  } = boardState;

  const [score, setScore] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [tickSpeed, setTickSpeed] = useState<TICK_SPEED>(TICK_SPEED.normal);
  const [isGameEnd, setIsGameEnd] = useState<boolean>(false);
  const [clearedRows, setClearedRows] = useState<number[]>([]);
  const [tetro, setTetro] = useState<TetroCell[][]>();
  const sideBtnIntervalRef = useRef<any>(null);

  useEffect(() => {
    // Set tetro definition when the params change
    const newTetro: TetroCell[][] = getTetroDefFor(
      tetrominoCol,
      tetrominoRow,
      tetromino,
      tetrominoDirection
    );
    setTetro(newTetro);
  }, [tetromino, tetrominoCol, tetrominoRow, tetrominoDirection]);

  useEffect(() => {
    // handle Cells change
    const clearingRows: number[] = getCompletedRows(cells);
    if (clearingRows.length) {
      setClearedRows(clearingRows);
      setTimeout(() => dispatchBoardState({ type: Action.clearRow }), 500);
      setScore(score + CELL_BREAK_SCORE * BOARD_WIDTH * clearingRows.length);
    } else {
      setClearedRows([]);
    }
  }, [cells]);

  /**
   * This useEffect registers the event listeners
   */
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.repeat) {
        return;
      }
      if (event.key === "ArrowDown") {
        setTickSpeed(TICK_SPEED.fast);
      }
      if (event.key === "ArrowUp") {
        handleHorizontalMoveAndRotation(Action.rotate);
      }
      if (event.key === "ArrowLeft") {
        handleHorizontalMoveAndRotation(Action.moveLeft);
      }
      if (event.key === "ArrowRight") {
        handleHorizontalMoveAndRotation(Action.moveRight);
      }
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      if (event.key === "ArrowDown") {
        setTickSpeed(TICK_SPEED.normal);
      }
      if (event.key === "ArrowLeft") {
        dismountHorizontalMoveInterval();
      }
      if (event.key === "ArrowRight") {
        dismountHorizontalMoveInterval();
      }
      if (event.key === "ArrowUp") {
        dismountHorizontalMoveInterval();
      }
    };
    // register event listeners
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, [isPlaying]);

  const handleDrop = (): void => {
    if (!isPlaying) {
      return;
    }

    return dispatchBoardState({ type: Action.drop });
  };

  // This will run the move horizontal
  const handleHorizontalMoveAndRotation = (
    moveDirection: Action.moveLeft | Action.moveRight | Action.rotate
  ) => {
    if (!isPlaying) {
      return;
    }

    performAction(() => dispatchBoardState({ type: moveDirection }));
  };

  const performAction = (action: () => void) => {
    // run once before set interval: action for single button press
    action();
    if (!!!sideBtnIntervalRef.current) {
      sideBtnIntervalRef.current = setInterval(
        () => action(),
        TICK_SPEED.sideMoveRotate
      );
    }
  };

  const dismountHorizontalMoveInterval = () => {
    clearInterval(sideBtnIntervalRef.current);
    sideBtnIntervalRef.current = null;
  };

  // This will run the drop vertical
  useInterval(handleDrop, tickSpeed);

  /**
   * Start the Game
   */
  const startGame = () => {
    setIsPlaying(true);
    setIsGameEnd(false);
    dispatchBoardState({ type: Action.start });
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  return {
    score: score,
    ...boardState,
    isPlaying: isPlaying,
    togglePlayPause: togglePlayPause,
    startGame: startGame,
    isGameEnd: isGameEnd,
    clearedRows: clearedRows,
    tetro: tetro,
    tetrominoQueue: tetrominoQueue,
  };
}
