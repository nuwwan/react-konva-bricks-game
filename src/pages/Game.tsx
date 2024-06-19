import Board from "../components/Board";
import Score from "../components/Score";

const GamePage: React.FC = () => {
  return (
    <div>
      <div style={{ width: 1000, margin: "auto" }}>
        <div>
          <Score score={0}/>
        </div>
        <div>
          <Board />
        </div>
      </div>
    </div>
  );
};
export default GamePage;
