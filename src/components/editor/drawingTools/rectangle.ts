type OnMouseDownType = {
  e: MouseEvent
  canvasOffset: { top: number; left: number }
  setIsPainting: (payload: boolean) => void
  ctx?: CanvasRenderingContext2D
}

type OnMouseMoveType = {
  e: MouseEvent
  ctx: CanvasRenderingContext2D
  canvasOffset: { top: number; left: number }
  isPainting: boolean
  startDrawingPosition: { top: number; left: number }
  canvasData: ImageData
}

export default {
  onMouseDown: ({ e, canvasOffset, setIsPainting }: OnMouseDownType): { top: number; left: number } => {
    setIsPainting(true)
    return {
      top: e.pageY - canvasOffset.top,
      left: e.pageX - canvasOffset.left,
    }
  },

  onMouseMove: ({ e, ctx, canvasOffset, isPainting, startDrawingPosition, canvasData }: OnMouseMoveType): void => {
    if (isPainting) {
      const rectangle: { width: number; height: number } = {
        width: e.pageX - canvasOffset.left - startDrawingPosition.left,
        height: e.pageY - canvasOffset.top - startDrawingPosition.top,
      }
      ctx.clearRect(0, 0, 760, 480)
      ctx.putImageData(canvasData, 0, 0)
      if (e.shiftKey) {
        let rectangleHeight: number

        if (rectangle.height < 0 && rectangle.width > 0) {
          // 4th quarter (x; -y)
          rectangleHeight = -rectangle.width
        } else if (rectangle.height < 0 && rectangle.width < 0) {
          // 3rd quarter (-x; -y)
          rectangleHeight = rectangle.width
        } else if (rectangle.height > 0 && rectangle.width < 0) {
          // 2nd quarter (-x; y)
          rectangleHeight = -rectangle.width
        } else {
          // 1st quarter (x; y)
          rectangleHeight = rectangle.width
        }
        ctx.strokeRect(startDrawingPosition.left, startDrawingPosition.top, rectangle.width, rectangleHeight)
      } else {
        ctx.strokeRect(startDrawingPosition.left, startDrawingPosition.top, rectangle.width, rectangle.height)
      }
    }
  },

  onMouseUp: (setIsPainting: (payload: boolean) => void): void => {
    setIsPainting(false)
  },
}
