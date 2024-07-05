import { TetrominoMetaType } from "../../types";

type PropsType = {
  next: TetrominoMetaType[];
};

const UpComingTetris: React.FC<PropsType> = (props) => {
  return (
    <div>
      {props.next.toReversed().map((tetro) => (
        <p>{tetro.tetromino}</p>
      ))}
    </div>
  );
};

export default UpComingTetris;
