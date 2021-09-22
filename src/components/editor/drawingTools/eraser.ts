type OnMouseDownType = {
  e: MouseEvent
  ctx: CanvasRenderingContext2D
  canvasOffset: { top: number; left: number }
  setIsPainting: (payload: boolean) => void
}

type OnMouseMoveType = {
  e: MouseEvent
  ctx: CanvasRenderingContext2D
  canvasOffset: { top: number; left: number }
  isPainting: boolean
  startDrawingPosition?: { top: number; left: number }
  canvasData?: ImageData
}

export default {
  onMouseDown: ({ e, ctx, canvasOffset, setIsPainting }: OnMouseDownType): void => {
    ctx.strokeStyle = '#FFFFFF'
    setIsPainting(true)
    ctx.beginPath()
    ctx.moveTo(e.pageX - canvasOffset.left, e.pageY - canvasOffset.top)
  },

  onMouseMove: ({ e, ctx, canvasOffset, isPainting }: OnMouseMoveType): void => {
    if (isPainting) {
      ctx.lineTo(e.pageX - canvasOffset.left, e.pageY - canvasOffset.top)
      ctx.stroke()
    }
  },

  onMouseUp: (setIsPainting: (payload: boolean) => void): void => {
    setIsPainting(false)
  },
}