type PropsType = {
  startGame: () => void;
  togglePlay: () => void;
  isPlaying: boolean;
  isGameEnd: boolean;
};

const ControlSection: React.FC<PropsType> = (props) => {
  return (
    <div>
      <div>
        <button onClick={props.startGame}>Start</button>
      </div>
      <div>
        <button onClick={props.togglePlay} disabled={props.isGameEnd}>
          {props.isPlaying ? "Pause" : "Play"}
        </button>
      </div>
    </div>
  );
};
export default ControlSection;
