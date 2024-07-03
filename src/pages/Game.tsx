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
    tetro,
  } = useBoard();

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div>
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
              tetroDef={tetro}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default GamePage;
