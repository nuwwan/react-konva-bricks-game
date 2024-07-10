import { Layer, Stage } from "react-konva";
import { TetrominoMetaType } from "../../types";
import TetroIcon from "./TetroIcon";
import { CELL_SIZE } from "../../config/app.config";

const config = {
  GAP_BETWEEN_SHAPES: 8,
  ICON_SIZE: CELL_SIZE * 3,
};

type PropsType = {
  next: TetrominoMetaType[];
};

const UpComingTetris: React.FC<PropsType> = (props) => {
  return (
    <div>
      <Stage width={105} height={330}>
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
            y={config.GAP_BETWEEN_SHAPES + config.ICON_SIZE}
          />
          <TetroIcon
            tetro={props.next[0].tetromino}
            direction={props.next[0].tetrominoDirection}
            x={0}
            y={2 * config.GAP_BETWEEN_SHAPES + 2 * config.ICON_SIZE}
          />
        </Layer>
      </Stage>
    </div>
  );
};

export default UpComingTetris;
