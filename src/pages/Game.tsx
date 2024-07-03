import Board from "../components/Board";
import Dashboard from "../components/dashboard/Dashboard";
import { useBoard } from "../hooks/useBoard";

const GamePage: React.FC = () => {
  const {
    cells,
    score,
    isPlaying,
    tetromino,
    tetrominoDirection,
    tetrominoCol,
    tetrominoRow,
    togglePlayPause,
    startGame,
    isGameEnd,
    clearedRows,
    tetro,
  } = useBoard();

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div>
          <div>
            <Dashboard
              score={score}
              isPlaying={isPlaying}
              togglePlayPause={togglePlayPause}
              startGame={startGame}
              isGameEnd={isGameEnd}
            />
          </div>
          <div>
            <Board
              cells={cells}
              tetromino={tetromino}
              tetrominoDirection={tetrominoDirection}
              tetrominoCol={tetrominoCol}
              tetrominoRow={tetrominoRow}
              clearningRows={clearedRows}
              tetroDef={tetro}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default GamePage;
