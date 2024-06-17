import Board from "../components/Board";
import Score from "../components/Score";

const GamePage: React.FC = () => {
  return (
    <div>
      <div style={{ display: "flex", width: 1000, margin: "auto" }}>
        <div>
          <Board />
        </div>
        <div>
          <Score />
        </div>
      </div>
    </div>
  );
};
export default GamePage;
