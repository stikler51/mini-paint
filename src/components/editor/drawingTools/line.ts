import { ToolOnMouseDown, ToolOnMouseMove, SinglePixel } from '../../../types/types'

export default {
  onMouseDown: ({ e, canvasOffset, setIsPainting, ctx }: ToolOnMouseDown): SinglePixel => {
    setIsPainting(true)
    return {
      top: e.pageY - canvasOffset.top,
      left: e.pageX - canvasOffset.left,
    }
  },

  onMouseMove: ({ e, ctx, canvasOffset, isPainting, startDrawingPosition, canvasData }: ToolOnMouseMove): void => {
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
