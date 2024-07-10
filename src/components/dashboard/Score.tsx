import React from "react";

type PropType = {
  score: number;
};

const Score: React.FC<PropType> = (props: PropType) => {
  const formatScore = (score: number): string => {
    return `${score}`;
  };

  return (
    <div>
      <div style={{ marginBottom: 50, textAlign: "center" }}>Score</div>
      <div style={{ height: 70, fontSize: "xxx-large" }}>
        <p style={{ margin: "auto", textAlign: "center" }}>
          {formatScore(props.score)}
        </p>
      </div>
    </div>
  );
};

export default Score;
