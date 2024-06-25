type PropType = {
  score: number;
  isPlaying: boolean;
  setIsPlaying: (flag: boolean) => void;
  startGame: () => void;
};

const Score: React.FC<PropType> = (props: PropType) => {
  const handleStartOnClick = () => {
    props.startGame();
  };
  const handleOnPause = () => {
    props.setIsPlaying(false);
  };

  return (
    <div>
      <div>Score</div>
      <div>{props.score}</div>
      <button onClick={handleStartOnClick}>Start</button>
      <button onClick={handleOnPause}>Pause</button>
    </div>
  );
};

export default Score;
