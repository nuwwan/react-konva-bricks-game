import { useEffect, useRef, useState } from "react";
import { Action, BoardState, Cell, TetrominoType } from "../types";
import { useBoardState } from "./useBoardStatus";
import { useInterval } from "./useInterval";
import { getRandomTetromino, getTetrominoDef } from "../utils/gameFunctions";
import { BOARD_HEIGHT, BOARD_WIDTH, TICK_SPEED } from "../config/app.config";

type TatrisBoardProps = BoardState & {
  score: number;
  startGame: () => void;
  isPlaying: boolean;
  setIsPlaying: (flag: boolean) => void;
};

export function useBoard(): TatrisBoardProps {
  const [score, setScore] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [tickSpeed, setTickSpeed] = useState<TICK_SPEED>(TICK_SPEED.normal);
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
      dispatchBoardState({ type: Action.commit });
    }
  };

  // This will run the drop verticall
  useInterval(handleDrop, tickSpeed);

  // This will run the move horizontal
  const handleHorizontalMove = (
    moveDirection: Action.moveLeft | Action.moveRight
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
      }
      if (event.key === "ArrowLeft") {
        handleHorizontalMove(Action.moveLeft);
      }
      if (event.key === "ArrowRight") {
        handleHorizontalMove(Action.moveRight);
      }
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      if (event.key === "ArrowDown") {
        setTickSpeed(TICK_SPEED.normal);
      }
      if (event.key === "ArrowUp") {
      }
      if (event.key === "ArrowLeft") {
        dismountHorizontalMoveInterval();
      }
      if (event.key === "ArrowRight") {
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
const isCollideVertically = (board: BoardState): boolean => {
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

/**
 * Check if the tetromino collides with board cells.
 * This method is used when user move left or right.
 * @param cells
 * @param tetrominoDef
 * @returns boolean
 */
const isTetrominoCollidesCells = (
  cells: Cell[][],
  tetrominoDef: Cell[][]
): boolean => {
  return tetrominoDef.some((row) =>
    row.some((c) => !!c.shape && cells[c.y][c.x].shape != null)
  );
};
