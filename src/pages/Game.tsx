import Board from "../components/Board";
import Dashboard from "../components/dashboard/Dashboard";
import { useBoard } from "../hooks/UseBoard";

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
    tetrominoQueue,
  } = useBoard();

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div style={{ display: "flex" }}>
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
          <div>
            <Dashboard
              score={score}
              isPlaying={isPlaying}
              togglePlayPause={togglePlayPause}
              startGame={startGame}
              isGameEnd={isGameEnd}
              tetrominoQueue={tetrominoQueue}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default GamePage;
