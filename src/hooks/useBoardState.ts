import { Dispatch, useReducer } from "react";
import {
  Action,
  BoardState,
  Cell,
  Direction,
  TetroCell,
  TetrominoMetaType,
  TetrominoType,
} from "../types";
import {
  BOARD_HEIGHT,
  BOARD_WIDTH,
  TETROMINO_ENTER_COL,
  TETROMINO_ENTER_ROW,
} from "../config/app.config";
import {
  getEmptyCellRow,
  getRandomDirection,
  getRandomTetromino,
  getRotatedTetroDirection,
  getTetroDefFor,
} from "../utils/gameFunctions";

type ActionType = {
  type: Action;
};

export function useBoardState(): [BoardState, Dispatch<ActionType>] {
  const initialState: BoardState = constructInitialBoard();
  const [boardState, dispatchBoardState] = useReducer(
    boardReducer,
    initialState
  );
  return [boardState, dispatchBoardState];
}

function boardReducer(state: BoardState, action: ActionType): BoardState {
  switch (action.type) {
    case Action.start:
      const newState: BoardState = constructInitialBoard();
      return newState;
    case Action.drop:
      const tetroAfterDrop: TetroCell[][] = getTetroDefFor(
        state.tetrominoCol,
        state.tetrominoRow + 1,
        state.tetromino,
        state.tetrominoDirection
      );
      if (
        isCollideBottomLine(tetroAfterDrop) ||
        isTetroCollidesCells(state.cells, tetroAfterDrop)
      ) {
        const tetroBeforeDrop: TetroCell[][] = getTetroDefFor(
          state.tetrominoCol,
          state.tetrominoRow,
          state.tetromino,
          state.tetrominoDirection
        );
        // Commit shape
        const cellsAfterCommit: Cell[][] = commitTetro(
          tetroBeforeDrop,
          state.cells
        );
        const { enqueueTetro, tetrominoQueue } = enQueueFromTetroQueue(
          state.tetrominoQueue
        );
        return {
          ...state,
          cells: cellsAfterCommit,
          ...enqueueTetro,
          tetrominoQueue: tetrominoQueue,
        };
      }
      return { ...state, tetrominoRow: state.tetrominoRow++ };

    case Action.moveRight:
      const tetroDefAfterMoveRight: TetroCell[][] = getTetroDefFor(
        state.tetrominoCol + 1,
        state.tetrominoRow,
        state.tetromino,
        state.tetrominoDirection
      );
      if (
        isCollidRightBoarder(tetroDefAfterMoveRight) ||
        isTetroCollidesCells(state.cells, tetroDefAfterMoveRight)
      ) {
        return state;
      }
      return {
        ...state,
        tetrominoCol: state.tetrominoCol + 1,
      };
    case Action.moveLeft:
      const tetroDefAfterMoveLeft: TetroCell[][] = getTetroDefFor(
        state.tetrominoCol - 1,
        state.tetrominoRow,
        state.tetromino,
        state.tetrominoDirection
      );
      if (
        isCollideLeftBoarder(tetroDefAfterMoveLeft) ||
        isTetroCollidesCells(state.cells, tetroDefAfterMoveLeft)
      ) {
        return state;
      }
      return {
        ...state,
        tetrominoCol: state.tetrominoCol - 1,
      };

    case Action.rotate:
      const newDirection: Direction = getRotatedTetroDirection(
        state.tetrominoDirection
      );
      const tetroDefAfterRotate: TetroCell[][] = getTetroDefFor(
        state.tetrominoCol,
        state.tetrominoRow,
        state.tetromino,
        newDirection
      );
      if (
        isCollidRightBoarder(tetroDefAfterRotate) ||
        isCollideLeftBoarder(tetroDefAfterRotate)
      ) {
        return state;
      }
      if (
        isTetroCollidesCells(state.cells, tetroDefAfterRotate) ||
        isCollideBottomLine(tetroDefAfterRotate)
      ) {
        const tetroBeforeRotate: TetroCell[][] = getTetroDefFor(
          state.tetrominoCol,
          state.tetrominoRow,
          state.tetromino,
          state.tetrominoDirection
        );
        // commit tetro
        const cellsAfterCommit: Cell[][] = commitTetro(
          tetroBeforeRotate,
          state.cells
        );
        const { enqueueTetro, tetrominoQueue } = enQueueFromTetroQueue(
          state.tetrominoQueue
        );
        return {
          ...state,
          cells: cellsAfterCommit,
          ...enqueueTetro,
          tetrominoQueue: tetrominoQueue,
        };
      }
      return {
        ...state,
        tetrominoDirection: newDirection,
      };

    case Action.clearRow:
      const cellsAfterReArrange = reArrangeCells(state.cells);
      return {
        ...state,
        cells: cellsAfterReArrange,
      };
    default:
      return state;
  }
}

const constructInitialBoard = (): BoardState => {
  let emptyCells: Cell[][] = Array(BOARD_HEIGHT)
    .fill(null)
    .map(() =>
      Array(BOARD_WIDTH)
        .fill(null)
        .map(() => ({ shape: null }))
    );
  const newTetromino: TetrominoType = getRandomTetromino();
  const newTetrominoDirection: Direction = getRandomDirection();
  const tetroQueue: TetrominoMetaType[] = getUpcomingTetroQueue();
  return {
    cells: emptyCells,
    tetromino: newTetromino,
    tetrominoCol: TETROMINO_ENTER_COL,
    tetrominoRow: TETROMINO_ENTER_ROW,
    tetrominoDirection: newTetrominoDirection,
    tetrominoQueue: tetroQueue,
  };
};

/**
 * This method will remove the completed rows from the board and
 * re-arrange the cells by changing the y values.
 * @param cells
 * @param completedRows
 */
const reArrangeCells = (cells: Cell[][]): Cell[][] => {
  let cellsAfterFilter = cells.filter((row, idx) => !row.every((c) => c.shape));
  const removedRowsCount = BOARD_HEIGHT - cellsAfterFilter.length;
  if (!removedRowsCount) {
    return cells;
  }
  // add empty rows on top to compensate
  return [
    ...Array(removedRowsCount)
      .fill(null)
      .map((row) => getEmptyCellRow()),
    ...cellsAfterFilter,
  ];
};

/**
 * This method checks tetro collides bottom line
 */
const isCollideBottomLine = (tetroDef: TetroCell[][]): boolean => {
  return tetroDef.some((row) =>
    row.some((c) => !!c.shape && c.y === BOARD_HEIGHT)
  );
};

/**
 * This method checks tetro collides left boarder
 */
const isCollideLeftBoarder = (tetroDef: TetroCell[][]): boolean => {
  return tetroDef.some((row) => row.some((c) => !!c.shape && c.x === -1));
};

/**
 * This method checks tetro collides right boarder
 */
const isCollidRightBoarder = (tetroDef: TetroCell[][]): boolean => {
  return tetroDef.some((row) =>
    row.some((c) => !!c.shape && c.x === BOARD_WIDTH)
  );
};

/**
 * Checks if the tetro has any collision with board cells
 * @param cells
 * @param tetro
 * @returns
 */
const isTetroCollidesCells = (
  cells: Cell[][],
  tetro: TetroCell[][]
): boolean => {
  return tetro.some((row) =>
    row.some((c) => c.y >= 0 && !!c.shape && !!cells[c.y][c.x].shape)
  );
};

/**
 * Commit Tetro to the board and return commited board
 * @param tetro
 * @param cells
 */
const commitTetro = (tetro: TetroCell[][], cells: Cell[][]): Cell[][] => {
  let newCells: Cell[][] = [...cells];
  for (const row of tetro) {
    for (const tetCell of row) {
      if (!!tetCell.shape) {
        newCells[tetCell.y][tetCell.x].shape = tetCell.shape;
      }
    }
  }
  return newCells;
};

/**
 * Returns required data for new tetromino
 * @returns
 */
const getRandomTetro = (): TetrominoMetaType => {
  const newTetromino: TetrominoType = getRandomTetromino();
  const newTetrominoDirection: Direction = getRandomDirection();
  return {
    tetromino: newTetromino,
    tetrominoCol: TETROMINO_ENTER_COL,
    tetrominoRow: TETROMINO_ENTER_ROW,
    tetrominoDirection: newTetrominoDirection,
  };
};

/**
 * Get the upcoming tetro queue.
 * @returns
 */
const getUpcomingTetroQueue = (): TetrominoMetaType[] => {
  return Array(3)
    .fill(null)
    .map(() => getRandomTetro());
};

const enQueueFromTetroQueue = (
  queue: TetrominoMetaType[]
): { tetrominoQueue: TetrominoMetaType[]; enqueueTetro: TetrominoMetaType } => {
  let tetroQueue = [...queue];
  const newTetro: TetrominoMetaType = getRandomTetro();

  const enqueuedTetro: TetrominoMetaType = tetroQueue.shift() || newTetro;
  const newTetroQueue: TetrominoMetaType[] = [...tetroQueue, newTetro];
  return { tetrominoQueue: newTetroQueue, enqueueTetro: enqueuedTetro };
};
