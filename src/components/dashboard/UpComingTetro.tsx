import { Layer, Stage } from "react-konva";
import { TetrominoMetaType } from "../../types";
import TetroIcon from "./TetroIcon";

type PropsType = {
  next: TetrominoMetaType[];
};

const UpComingTetris: React.FC<PropsType> = (props) => {
  return (
    <div>
      <Stage width={60} height={220}>
        <Layer>
          <TetroIcon
            tetro={props.next[2].tetromino}
            direction={props.next[2].tetrominoDirection}
            x={0}
            y={0}
          />
          <TetroIcon
            tetro={props.next[1].tetromino}
            direction={props.next[1].tetrominoDirection}
            x={0}
            y={70}
          />
          <TetroIcon
            tetro={props.next[0].tetromino}
            direction={props.next[0].tetrominoDirection}
            x={0}
            y={140}
          />
        </Layer>
      </Stage>
    </div>
  );
};

export default UpComingTetris;
