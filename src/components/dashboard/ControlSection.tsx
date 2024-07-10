type PropsType = {
  startGame: () => void;
  togglePlay: () => void;
  isPlaying: boolean;
  isGameEnd: boolean;
};

const ControlSection: React.FC<PropsType> = (props) => {
  return (
    <div>
      <div style={{ marginBottom: 20 }}>
        <button onClick={props.startGame} style={{ height: 60, width: 160 }}>
          Start
        </button>
      </div>
      <div>
        <button
          onClick={props.togglePlay}
          disabled={props.isGameEnd}
          style={{ height: 60, width: 160 }}
        >
          {props.isPlaying ? "Pause" : "Play"}
        </button>
      </div>
    </div>
  );
};
export default ControlSection;
