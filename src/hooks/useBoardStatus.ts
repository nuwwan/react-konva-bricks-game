import { Dispatch, useReducer, useState } from "react";
import {
  BOARD_HEIGHT,
  BOARD_WIDTH,
  TETROMINO_ENTER_COL,
  TETROMINO_ENTER_ROW,
} from "../config/app.config";
import { Action, BoardState, Cell, CellType } from "../types";

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
        tetrominoRow:
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
      //TODO: commit code here
      return state;

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
  const emptyCell: Cell = { shape: null };
  const cells = Array(BOARD_HEIGHT)
    .fill(null)
    .map(() => Array(BOARD_WIDTH).fill(emptyCell));
  return {
    cells: cells,
    tetromino: CellType.I,
    tetrominoCol: TETROMINO_ENTER_COL,
    tetrominoRow: TETROMINO_ENTER_ROW,
    isPlaying:false,
  };
};
