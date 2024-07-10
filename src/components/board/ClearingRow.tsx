import { Rect } from "react-konva";
import { BOARD_WIDTH, CELL_SIZE } from "../../config/app.config";
import { useEffect, useRef } from "react";

type PropsType = {
  rowId: number;
};

const ClearingRow: React.FC<PropsType> = (props) => {
  const shapeRef = useRef(null);

  useEffect(() => {
    const shape = shapeRef.current;
    pulseShape(shape);
  }, []);

  /**
   * Animation for clearing rows
   * @param shape
   */
  const pulseShape = (shape: any) => {
    shape.to({
      scaleX: 1.5,
      scaleY: 1.5,
      onFinish: () => {
        shape.to({
          scaleX: 1,
          scaleY: 1,
        });
      },
      duration: 0.5,
    });
  };

  return (
    <Rect
      ref={shapeRef}
      x={0}
      y={props.rowId * CELL_SIZE}
      height={CELL_SIZE}
      width={BOARD_WIDTH * CELL_SIZE}
      stroke={"black"}
      strokeWidth={5}
    />
  );
};
export default ClearingRow;
