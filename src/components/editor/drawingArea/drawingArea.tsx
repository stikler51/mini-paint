import React, {
  useRef, useEffect, useState
} from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../../store/hooks';
import { pushActionInHistory } from '../../../store/artSlice';
import styles from './drawingArea.module.scss';
import pen from '../drawingTools/pen';
import rectangle from '../drawingTools/rectangle';
import ellipse from '../drawingTools/ellipse';
import line from '../drawingTools/line';
import bucket from '../drawingTools/paintBucket';
import eraser from '../drawingTools/eraser';
import { saveArt, getOneArt, updateArt } from '../../../firebase/db';

const DrawingArea = () => {
  const canvas = useRef<HTMLCanvasElement | null>(null);
  const [isPainting, setIsPainting] = useState<boolean | null>(false);
  const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null);
  const [canvasOffset, setCanvasOffset] = useState<{ left: number, top: number }>({
    left: 0,
    top: 0
  });
  const [startDrawingPosition, setStartDrawingPosition] = useState<{ left: number, top: number }>({
    left: 0,
    top: 0
  });
  const [canvasData, setCanvasData] = useState<ImageData | null>(null);

  const tools: any = {
    pen,
    rectangle,
    ellipse,
    line,
    bucket,
    eraser
  };

  const { artId } = useParams<{ artId: string }>();
  const history = useHistory();

  const { activeTool, color, lineWidth } = useAppSelector<{
    activeTool: string,
    color: string,
    lineWidth: number
  }>((state) => state.tool.value);
  const theme = useAppSelector<string>((state) => state.theme.value);
  const { currentPosition, artHistory, manualChanging } = useAppSelector<
    {
      currentPosition: number,
      artHistory: any[],
      manualChanging: boolean
    }
  >((state) => state.art.value);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const canvasCtx = canvas.current?.getContext('2d', { alpha: false });
    if (canvasCtx && canvas.current) {
      canvasCtx.fillStyle = '#FFFFFF';
      canvasCtx.fillRect(0, 0, 760, 480);
      canvasCtx.strokeStyle = color;
      canvasCtx.fillStyle = color;
      canvasCtx.lineWidth = lineWidth;

      if (artId) {
        getOneArt(artId)
          .then((art) => {
            const image = new Image();
            image.src = art.data()?.imageData;
            image.onload = function () {
              canvasCtx.drawImage(image, 0, 0, 760, 480);
            };
          });
      }

      dispatch(pushActionInHistory(canvas.current?.toDataURL()));
      setCtx(canvasCtx);
      setCanvasOffset({
        left: canvas.current.offsetLeft,
        top: canvas.current.offsetTop
      });
    }
  }, []);

  useEffect(() => {
    if (ctx) {
      ctx.strokeStyle = color;
    }
  }, [activeTool]);

  useEffect(() => {
    if (ctx) {
      ctx.strokeStyle = color;
      ctx.fillStyle = color;
    }
  }, [color]);

  useEffect(() => {
    if (ctx) {
      ctx.lineWidth = lineWidth;
    }
  }, [lineWidth]);

  useEffect(() => {
    if (ctx && manualChanging) {
      const image = new Image();
      image.onload = function () {
        ctx.drawImage(image, 0, 0, 760, 480);
      };
      image.src = artHistory[currentPosition];
    }
  }, [currentPosition]);

  const onMouseDown = (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>): void => {
    const startPosition = tools[activeTool].onMouseDown({
      e, ctx, canvasOffset, setIsPainting
    });
    setStartDrawingPosition(startPosition);
    if (ctx) {
      setCanvasData(ctx.getImageData(0, 0, 760, 480));
    }
  };

  const onMouseMove = (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>): void => {
    tools[activeTool]
      .onMouseMove({
        e, ctx, canvasOffset, isPainting, startDrawingPosition, canvasData
      });
  };

  const onMouseUp = () => {
    tools[activeTool].onMouseUp(setIsPainting);
    dispatch(pushActionInHistory(canvas.current?.toDataURL()));
  };

  const clearCanvas = () => {
    const sure = window.confirm('Are you sure?');
    if (sure && ctx) {
      ctx.clearRect(0, 0, 760, 480);
    }
  };

  const saveArtToDb = () => {
    if (canvas.current) {
      const dataURL = canvas.current?.toDataURL();
      saveArt(dataURL).then((id) => history.push(`/editor/${id}`));
    }
  };

  const updateArtInDb = () => {
    if (canvas.current) {
      const dataURL = canvas.current?.toDataURL();
      updateArt(dataURL, artId);
    }
  };

  return (
    <div className={styles[theme]}>
      <canvas
        ref={canvas}
        id="canvas"
        onMouseDown={(e) => onMouseDown(e)}
        onMouseMove={(e) => onMouseMove(e)}
        onMouseUp={() => onMouseUp()}
        width="760px"
        height="480px"
      />

      <div className={styles.bottomPanel}>
        <button
          type="button"
          className="btn btn-warning"
          onClick={clearCanvas}
        >
          Clear
        </button>
        <button
          type="button"
          className="btn btn-success"
          onClick={artId ? updateArtInDb : saveArtToDb}
        >
          {artId ? 'Update' : 'Save'}
        </button>
      </div>
    </div>
  );
};

export default DrawingArea;
