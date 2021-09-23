import { ToolOnMouseDown, ToolOnMouseMove, SinglePixel } from '../../../types/types'

export default {
  onMouseDown: ({ e, ctx, canvasOffset, setIsPainting }: ToolOnMouseDown): SinglePixel => {
    setIsPainting(true)
    if (ctx) {
      ctx.beginPath()
      ctx.moveTo(e.pageX - canvasOffset.left, e.pageY - canvasOffset.top)
    }
    return { top: 0, left: 0 }
  },

  onMouseMove: ({ e, ctx, canvasOffset, isPainting, startDrawingPosition, canvasData }: ToolOnMouseMove): void => {
    if (isPainting && ctx) {
      ctx.lineTo(e.pageX - canvasOffset.left, e.pageY - canvasOffset.top)
      ctx.stroke()
    }
  },
}
