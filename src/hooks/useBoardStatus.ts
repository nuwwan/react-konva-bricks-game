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
      return {
        ...state,
        tetrominoCol:
          state.tetrominoCol < BOARD_WIDTH - 1
            ? state.tetrominoCol + 1
            : state.tetrominoCol,
      };
    case Action.moveLeft:
      return {
        ...state,
        tetrominoCol:
          state.tetrominoCol > 0 ? state.tetrominoCol - 1 : state.tetrominoCol,
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
        tetrominoDirection: Direction.R,
      };

    case Action.rotate:
      // TODO: rotate code here
      return state;

    case Action.moveDown:
      // TODO: move down code here
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
  return {
    cells: emptyCells,
    tetromino: TetrominoType.I,
    tetrominoCol: TETROMINO_ENTER_COL,
    tetrominoRow: TETROMINO_ENTER_ROW,
    tetrominoDirection: Direction.R,
  };
};
