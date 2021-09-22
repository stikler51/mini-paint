type OnMouseDownType = {
  e: React.MouseEvent
  canvasOffset: { top: number; left: number }
  setIsPainting: (payload: boolean) => void
  ctx: CanvasRenderingContext2D | undefined
}

type OnMouseMoveType = {
  e: React.MouseEvent
  ctx: CanvasRenderingContext2D | undefined
  canvasOffset: { top: number; left: number }
  isPainting: boolean
  startDrawingPosition: { top: number; left: number }
  canvasData: ImageData | undefined
}

export default {
  onMouseDown: ({ e, canvasOffset, setIsPainting, ctx }: OnMouseDownType): { top: number; left: number } => {
    setIsPainting(true)
    return {
      top: e.pageY - canvasOffset.top,
      left: e.pageX - canvasOffset.left,
    }
  },

  onMouseMove: ({ e, ctx, canvasOffset, isPainting, startDrawingPosition, canvasData }: OnMouseMoveType): void => {
    if (isPainting && ctx && canvasData) {
      const finishPos: { x: number; y: number } = {
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
}
