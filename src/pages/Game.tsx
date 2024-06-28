import Board from "../components/Board";
import Score from "../components/Score";
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
    setIsPlaying,
    startGame,
    isGameEnd,
    clearedRows,
  } = useBoard();

  return (
    <div>
      <div style={{ width: 1000, margin: "auto" }}>
        <div>
          <Score
            score={score}
            isPlaying={isPlaying}
            setIsPlaying={setIsPlaying}
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
          />
        </div>
      </div>
    </div>
  );
};
export default GamePage;
