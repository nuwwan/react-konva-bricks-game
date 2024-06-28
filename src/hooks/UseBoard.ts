import { useEffect, useRef, useState } from "react";
import { Action, BoardState, Cell, TetroCell, TetrominoType } from "../types";
import { useBoardState } from "./useBoardStatus";
import { useInterval } from "./useInterval";
import { getCompletedRows, getTetrominoDef } from "../utils/gameFunctions";
import { BOARD_HEIGHT, TICK_SPEED } from "../config/app.config";

type TatrisBoardProps = BoardState & {
  score: number;
  startGame: () => void;
  isPlaying: boolean;
  isGameEnd: boolean;
  setIsPlaying: (flag: boolean) => void;
  clearedRows: number[];
};

export function useBoard(): TatrisBoardProps {
  const [score, setScore] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [tickSpeed, setTickSpeed] = useState<TICK_SPEED>(TICK_SPEED.normal);
  const [isGameEnd, setIsGameEnd] = useState<boolean>(false);
  const [clearedRows, setClearedRows] = useState<number[]>([]);
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
    if (!isPlaying) {
      return;
    } else if (!isCollideVertically(boardAfterDrop)) {
      dispatchBoardState({ type: Action.drop });
    } else {
      handleCommit();
    }
  };

  const handleCommit = (): void => {
    const { cells, tetromino, tetrominoCol, tetrominoRow, tetrominoDirection } =
      boardState;
    const tetrominoDef: TetroCell[][] = getTetrominoDef(
      tetromino,
      tetrominoDirection,
      tetrominoRow,
      tetrominoCol
    );
    const clearingRows: number[] = getCompletedRows(cells);
    if (clearingRows.length) {
      setClearedRows(clearingRows);
    }
    // Game ends when the tetromino isn't fully inside the board at commiting,
    if (!isTetrominoFullyInsideBoard(tetrominoDef)) {
      setIsGameEnd(true);
      setIsPlaying(false);
    } else {
      dispatchBoardState({ type: Action.commit });
    }
  };

  // This will run the drop verticall
  useInterval(handleDrop, tickSpeed);

  // This will run the move horizontal
  const handleHorizontalMoveAndRotation = (
    moveDirection: Action.moveLeft | Action.moveRight | Action.rotate
  ) => {
    if (!isPlaying) {
      return;
    }

    // run once before set interval: action for single button press
    dispatchBoardState({ type: moveDirection });
    sideBtnIntervalRef.current = setInterval(
      () => dispatchBoardState({ type: moveDirection }),
      300
    );
  };

  const dismountHorizontalMoveInterval = () => {
    clearInterval(sideBtnIntervalRef.current);
    sideBtnIntervalRef.current = null;
  };

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
        // Rotate tetromino
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
        // Rotate tetromino
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

  /**
   * Start the Game
   */
  const startGame = () => {
    setIsPlaying(true);
    setIsGameEnd(false);
    dispatchBoardState({ type: Action.start });
  };

  return {
    score: score,
    ...boardState,
    isPlaying: isPlaying,
    setIsPlaying: setIsPlaying,
    startGame: startGame,
    isGameEnd: isGameEnd,
    clearedRows: clearedRows,
  };
}

/**
 * Check tetromino collides with board cells
 */
const isCollideVertically = (board: BoardState): boolean => {
  const { cells, tetromino, tetrominoCol, tetrominoRow, tetrominoDirection } =
    board;
  const tetrominoDef: TetroCell[][] = getTetrominoDef(
    tetromino,
    tetrominoDirection,
    tetrominoRow,
    tetrominoCol
  );
  return tetrominoDef.some((row) =>
    row.some((c) =>
      !!c.shape && c.y == BOARD_HEIGHT
        ? !!c.shape && c.y == BOARD_HEIGHT
        : c.y >= 0 && !!c.shape && cells[c.y][c.x].shape != null
    )
  );
};

// /**
//  * Check if the tetromino collides with board cells.
//  * This method is used when user move left or right.
//  * @param cells
//  * @param tetrominoDef
//  * @returns boolean
//  */
// const isTetrominoCollidesCells = (
//   cells: Cell[][],
//   tetrominoDef: Cell[][]
// ): boolean => {
//   return tetrominoDef.some((row) =>
//     row.some((c) => !!c.shape && cells[c.y][c.x].shape != null)
//   );
// };

/**
 * Check if the tetromino fully inside the board.
 * This function is used when commiting the tetromino.
 * @param tetrominoDef
 */
const isTetrominoFullyInsideBoard = (tetrominoDef: TetroCell[][]): boolean => {
  return tetrominoDef.every((row) => row.every((c) => c.y >= 0));
};
