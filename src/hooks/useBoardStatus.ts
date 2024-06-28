import { Dispatch, useReducer } from "react";
import {
  BOARD_HEIGHT,
  BOARD_WIDTH,
  TETROMINO_ENTER_COL,
  TETROMINO_ENTER_ROW,
} from "../config/app.config";
import { Action, BoardState, Cell, TetrominoType, Direction } from "../types";
import { getRandomTetromino, getTetrominoDef } from "../utils/gameFunctions";

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
      const tetroDef: Cell[][] = getTetrominoDef(
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
          state.tetrominoDirection === Direction.H ? Direction.V : Direction.H,
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
      const tetrominoDef: Cell[][] = getTetrominoDef(
        tetromino,
        tetrominoDirection,
        tetrominoRow,
        tetrominoCol
      );
      const newCells: Cell[][] = [...cells];
      for (const row of tetrominoDef) {
        for (const tetCell of row) {
          if (!!tetCell.shape) {
            newCells[tetCell.y][tetCell.x].shape = tetCell.shape;
          }
        }
      }

      // Get new tetromino
      const newTetromino: TetrominoType = getRandomTetromino();

      return {
        ...state,
        cells: newCells,
        tetromino: newTetromino,
        tetrominoCol: TETROMINO_ENTER_COL,
        tetrominoRow: TETROMINO_ENTER_ROW,
        tetrominoDirection: Direction.H,
      };

    case Action.rotate:
      // TODO: rotate code here
      return state;

    default:
      return state;
  }
}

const constructInitialBoard = (): BoardState => {
  let emptyCells: Cell[][] = Array(BOARD_HEIGHT)
    .fill(null)
    .map((rV, y) =>
      Array(BOARD_WIDTH)
        .fill(null)
        .map((cV, x) => ({ shape: null, x: x, y: y }))
    );
  const newTetromino: TetrominoType = getRandomTetromino();
  return {
    cells: emptyCells,
    tetromino: newTetromino,
    tetrominoCol: TETROMINO_ENTER_COL,
    tetrominoRow: TETROMINO_ENTER_ROW,
    tetrominoDirection: Direction.H,
  };
};

/**
 * Returns the max of x of the tetromino def.
 * Only the cells with cell type will be considered
 * @param tetrominoDef
 * @returns
 */
const getTetrominoMaxX = (tetrominoDef: Cell[][]) => {
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
