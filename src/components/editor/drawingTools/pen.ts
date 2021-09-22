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
  onMouseDown: ({ e, ctx, canvasOffset, setIsPainting }: OnMouseDownType): { top: number; left: number } => {
    setIsPainting(true)
    if (ctx) {
      ctx.beginPath()
      ctx.moveTo(e.pageX - canvasOffset.left, e.pageY - canvasOffset.top)
    }
    return { top: 0, left: 0 }
  },

  onMouseMove: ({ e, ctx, canvasOffset, isPainting, startDrawingPosition, canvasData }: OnMouseMoveType): void => {
    if (isPainting && ctx) {
      ctx.lineTo(e.pageX - canvasOffset.left, e.pageY - canvasOffset.top)
      ctx.stroke()
    }
  },
}
