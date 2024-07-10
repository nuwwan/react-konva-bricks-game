import { TetrominoMetaType } from "../../types";
import Section from "../ui/Section";
import ControlSection from "./ControlSection";
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
    <div style={{ width: 200 }}>
      <Section>
        <UpComingTetris next={props.tetrominoQueue} />
      </Section>
      <Section>
        <ControlSection
          isPlaying={props.isPlaying}
          startGame={props.startGame}
          togglePlay={props.togglePlayPause}
          isGameEnd={props.isGameEnd}
        />
      </Section>
      <Section>
        <Score score={props.score} />
      </Section>
    </div>
  );
};
export default Dashboard;
