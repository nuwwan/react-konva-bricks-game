type PropType = {
  score: number;
};

const Score: React.FC<PropType> = (props: PropType) => {
  return (
    <div>
      <div>Score</div>
      <div>{props.score}</div>
    </div>
  );
};

export default Score;
