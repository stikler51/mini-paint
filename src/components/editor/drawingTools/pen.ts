type onMouseDownType = {
  e: MouseEvent,
  ctx: CanvasRenderingContext2D,
  canvasOffset: { top: number, left: number },
  setIsPainting: (payload: boolean) => void
}

type onMouseMoveType = {
  e: MouseEvent,
  ctx: CanvasRenderingContext2D,
  canvasOffset: { top: number, left: number },
  isPainting: boolean,
  startDrawingPosition?: { top: number, left: number },
  canvasData?: ImageData
}

export default {
  onMouseDown: ({
    e,
    ctx,
    canvasOffset,
    setIsPainting
  }: onMouseDownType): void => {
    setIsPainting(true);
    ctx.beginPath();
    ctx.moveTo(e.pageX - canvasOffset.left, e.pageY - canvasOffset.top);
  },

  onMouseMove: ({
    e,
    ctx,
    canvasOffset,
    isPainting
  }: onMouseMoveType): void => {
    if (isPainting) {
      ctx.lineTo(e.pageX - canvasOffset.left, e.pageY - canvasOffset.top);
      ctx.stroke();
    }
  },

  onMouseUp: (setIsPainting: (payload: boolean) => void): void => {
    setIsPainting(false);
  }
};
