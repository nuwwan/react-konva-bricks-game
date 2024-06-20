import { useBoardState } from "../hooks/useBoardStatus";
import { Action } from "../types";

type PropType = {
  score: number;
};
const Score: React.FC<PropType> = (props: PropType) => {
  const [boardState, dispatchBoardState] = useBoardState();
  const handleStartOnClick = () => {
    dispatchBoardState({ type: Action.start });
  };
  return (
    <div>
      <div>Score</div>
      <div>{props.score}</div>
      <button onClick={handleStartOnClick}>Start</button>
    </div>
  );
};

export default Score;
