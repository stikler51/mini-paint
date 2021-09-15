import React, {
  useRef, useEffect, useState
} from 'react';
import { useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import styles from './drawingArea.module.scss';
import pen from '../drawingTools/pen';
import rectangle from '../drawingTools/rectangle';
import ellipse from '../drawingTools/ellipse';
import line from '../drawingTools/line';
import { saveArt, getOneArt, updateArt } from '../../../firebase/db';

const DrawingArea = () => {
  const canvas = useRef();
  const [isPainting, setIsPainting] = useState(false);
  const [ctx, setCtx] = useState(null);
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
    ellipse,
    line
  };

  const { artId } = useParams();
  const history = useHistory();

  const { activeTool, color, lineWidth } = useSelector((state) => state.tool.value);
  const theme = useSelector((state) => state.theme.value);

  useEffect(() => {
    const canvasCtx = canvas.current.getContext('2d');
    canvasCtx.strokeStyle = color;
    canvasCtx.lineWidth = lineWidth;

    if (artId) {
      getOneArt(artId)
        .then((art) => {
          const image = new Image();
          image.src = art.data().imageData;
          canvasCtx.drawImage(image, 0, 0);
        });
    }

    setCtx(canvasCtx);
    setCanvasOffset({
      left: canvas.current.offsetLeft,
      top: canvas.current.offsetTop
    });
  }, []);

  useEffect(() => {
    if (ctx) {
      ctx.strokeStyle = color;
    }
  }, [color]);

  useEffect(() => {
    if (ctx) {
      ctx.lineWidth = lineWidth;
    }
  }, [lineWidth]);

  const onMouseDown = (e) => {
    const startPosition = tools[activeTool].onMouseDown(e, ctx, canvasOffset, setIsPainting);
    setStartDrawingPosition(startPosition);
    setCanvasData(ctx.getImageData(0, 0, 760, 480));
  };

  const onMouseMove = (e) => {
    tools[activeTool]
      .onMouseMove(e, ctx, canvasOffset, isPainting, startDrawingPosition, canvasData);
  };

  const onMouseUp = () => {
    tools[activeTool].onMouseUp(setIsPainting);
  };

  const clearCanvas = () => {
    const sure = window.confirm('Are you sure?');
    if (sure) {
      ctx.clearRect(0, 0, 760, 480);
    }
  };

  const saveArtToDb = () => {
    const dataURL = canvas.current.toDataURL();
    saveArt(dataURL).then((id) => history.push(`/editor/${id}`));
  };

  const updateArtInDb = () => {
    const dataURL = canvas.current.toDataURL();
    updateArt(dataURL, artId);
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
          className="btn btn-danger"
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
