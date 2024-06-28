type PropType = {
  score: number;
  isPlaying: boolean;
  isGameEnd: boolean;
  setIsPlaying: (flag: boolean) => void;
  startGame: () => void;
};

const Score: React.FC<PropType> = (props: PropType) => {
  const handleStartOnClick = () => {
    props.startGame();
  };
  const togglePlayPause = () => {
    props.setIsPlaying(!props.isPlaying);
  };

  return (
    <div>
      <div>Score</div>
      <div>{props.score}</div>
      <button onClick={handleStartOnClick}>Start</button>
      <button onClick={togglePlayPause} disabled={props.isGameEnd}>
        {props.isPlaying ? "Pause" : "Play"}
      </button>
      {props.isGameEnd && <p>Game End</p>}
    </div>
  );
};

export default Score;
