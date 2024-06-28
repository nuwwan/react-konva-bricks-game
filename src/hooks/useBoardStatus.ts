import { Dispatch, useReducer } from "react";
import {
  BOARD_HEIGHT,
  BOARD_WIDTH,
  TETROMINO_ENTER_COL,
  TETROMINO_ENTER_ROW,
} from "../config/app.config";
import {
  Action,
  BoardState,
  Cell,
  TetrominoType,
  Direction,
  TetroCell,
} from "../types";
import {
  getCompletedRows,
  getEmptyCellRow,
  getRandomDirection,
  getRandomTetromino,
  getTetrominoDef,
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
      return { ...state, tetrominoRow: state.tetrominoRow++ };

    case Action.moveRight:
      const tetroDef: TetroCell[][] = getTetrominoDef(
        state.tetromino,
        state.tetrominoDirection,
        state.tetrominoRow,
        state.tetrominoCol
      );
      const tetroMaxX = getTetrominoMaxX(tetroDef);
      return {
        ...state,
        tetrominoCol:
          tetroMaxX < BOARD_WIDTH - 1
            ? state.tetrominoCol + 1
            : state.tetrominoCol,
      };
    case Action.moveLeft:
      return {
        ...state,
        tetrominoCol:
          state.tetrominoCol > 0 ? state.tetrominoCol - 1 : state.tetrominoCol,
      };

    case Action.rotate:
      return {
        ...state,
        tetrominoDirection:
          state.tetrominoDirection === Direction.R
            ? Direction.U
            : state.tetrominoDirection === Direction.U
            ? Direction.L
            : state.tetrominoDirection === Direction.L
            ? Direction.D
            : Direction.R,
      };

    case Action.commit:
      const {
        cells,
        tetromino,
        tetrominoDirection,
        tetrominoCol,
        tetrominoRow,
      } = state;
      // commit the shape
      const tetrominoDef: TetroCell[][] = getTetrominoDef(
        tetromino,
        tetrominoDirection,
        tetrominoRow,
        tetrominoCol
      );
      let newCells: Cell[][] = [...cells];
      for (const row of tetrominoDef) {
        for (const tetCell of row) {
          if (!!tetCell.shape) {
            newCells[tetCell.y][tetCell.x].shape = tetCell.shape;
          }
        }
      }

      // remove completed rows if available
      newCells = reArrangeCells(newCells);

      // Get new tetromino
      const newTetromino: TetrominoType = getRandomTetromino();
      const newTetrominoDirection: Direction = getRandomDirection();

      return {
        ...state,
        cells: newCells,
        tetromino: newTetromino,
        tetrominoCol: TETROMINO_ENTER_COL,
        tetrominoRow: TETROMINO_ENTER_ROW,
        tetrominoDirection: newTetrominoDirection,
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
  return {
    cells: emptyCells,
    tetromino: newTetromino,
    tetrominoCol: TETROMINO_ENTER_COL,
    tetrominoRow: TETROMINO_ENTER_ROW,
    tetrominoDirection: newTetrominoDirection,
  };
};

/**
 * Returns the max of x of the tetromino def.
 * Only the cells with cell type will be considered
 * @param tetrominoDef
 * @returns
 */
const getTetrominoMaxX = (tetrominoDef: TetroCell[][]) => {
  let maxX = 0;
  for (const row of tetrominoDef) {
    for (const c of row) {
      if (!!c.shape && c.x > maxX) {
        maxX = c.x;
      }
    }
  }
  return maxX;
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
