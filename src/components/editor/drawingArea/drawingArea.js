import React, {
  useRef, useEffect, useState
} from 'react';
import styles from './drawingArea.module.scss';
import pen from '../drawingTools/pen';
import rectangle from '../drawingTools/rectangle';
import ellipse from '../drawingTools/ellipse';

const DrawingArea = () => {
  const canvas = useRef();
  const [isPainting, setIsPainting] = useState(false);
  const [ctx, setCtx] = useState('wapap');
  const [canvasOffset, setCanvasOffset] = useState({
    left: 0,
    top: 0
  });
  const [startDrawingPosition, setStartDrawingPosition] = useState({
    left: 0,
    top: 0
  });
  const [canvasData, setCanvasData] = useState();
  const tools = {
    pen,
    rectangle,
    ellipse
  };

  const activeTool = tools.ellipse;

  useEffect(() => {
    const canvasCtx = canvas.current.getContext('2d');
    setCtx(canvasCtx);
    setCanvasOffset({
      left: canvas.current.offsetLeft,
      top: canvas.current.offsetTop
    });
  }, []);

  const onMouseDown = (e) => {
    const startPosition = activeTool.onMouseDown(e, ctx, canvasOffset, setIsPainting);
    setStartDrawingPosition(startPosition);
    setCanvasData(ctx.getImageData(0, 0, 760, 480));
  };

  const onMouseMove = (e) => {
    activeTool.onMouseMove(e, ctx, canvasOffset, isPainting, startDrawingPosition, canvasData);
  };

  const onMouseUp = () => {
    activeTool.onMouseUp(setIsPainting);
  };

  return (
    <canvas
      ref={canvas}
      id="canvas"
      onMouseDown={(e) => onMouseDown(e)}
      onMouseMove={(e) => onMouseMove(e)}
      onMouseUp={() => onMouseUp()}
      className={styles.drawingArea}
      width="760px"
      height="480px"
    />
  );
};

export default DrawingArea;
