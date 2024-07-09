import { TetrominoMetaType } from "../../types";
import ControlSection from "../ControlSection";
import Score from "./Score";
import UpComingTetris from "./UpComingTetro";

type PropType = {
  score: number;
  isPlaying: boolean;
  isGameEnd: boolean;
  startGame: () => void;
  togglePlayPause: () => void;
  tetrominoQueue: TetrominoMetaType[];
};

const Dashboard: React.FC<PropType> = (props) => {
  return (
    <div>
      <div style={{ display: "flex" }}>
        <div style={{ width: 232 }}>
          <Score score={props.score} />
        </div>
        <div style={{ width: 60 }}>
          <UpComingTetris next={props.tetrominoQueue} />
        </div>
        <div style={{ width: 232 }}>
          <ControlSection
            isPlaying={props.isPlaying}
            startGame={props.startGame}
            togglePlay={props.togglePlayPause}
            isGameEnd={props.isGameEnd}
          />
        </div>
      </div>
    </div>
  );
};
export default Dashboard;
