type onMouseDownType = {
  e: MouseEvent
  canvasOffset: { top: number; left: number }
  setIsPainting: (payload: boolean) => void
  ctx?: CanvasRenderingContext2D
}

type onMouseMoveType = {
  e: MouseEvent
  ctx: CanvasRenderingContext2D
  canvasOffset: { top: number; left: number }
  isPainting: boolean
  startDrawingPosition: { top: number; left: number }
  canvasData: ImageData
}

export default {
  onMouseDown: ({ e, canvasOffset, setIsPainting }: onMouseDownType): { top: number; left: number } => {
    setIsPainting(true)
    const start = {
      top: e.pageY - canvasOffset.top,
      left: e.pageX - canvasOffset.left,
    }

    return start
  },

  onMouseMove: ({ e, ctx, canvasOffset, isPainting, startDrawingPosition, canvasData }: onMouseMoveType): void => {
    if (isPainting) {
      const finishPos = {
        x: e.pageX - canvasOffset.left,
        y: e.pageY - canvasOffset.top,
      }
      ctx.clearRect(0, 0, 760, 480)
      ctx.putImageData(canvasData, 0, 0)
      ctx.beginPath()
      ctx.moveTo(startDrawingPosition.left, startDrawingPosition.top)
      ctx.lineTo(finishPos.x, finishPos.y)
      ctx.stroke()
    }
  },

  onMouseUp: (setIsPainting: (payload: boolean) => void) => {
    setIsPainting(false)
  },
}
