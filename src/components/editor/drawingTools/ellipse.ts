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
    const start = {
      top: e.pageY - canvasOffset.top,
      left: e.pageX - canvasOffset.left,
    }

    return start
  },

  onMouseMove: ({ e, ctx, canvasOffset, isPainting, startDrawingPosition, canvasData }: OnMouseMoveType): void => {
    if (isPainting) {
      const radiusX = Math.round((e.pageX - canvasOffset.left - startDrawingPosition.left) / 2)
      const radiusY = Math.round((e.pageY - canvasOffset.top - startDrawingPosition.top) / 2)
      ctx.clearRect(0, 0, 760, 480)
      ctx.putImageData(canvasData, 0, 0)
      ctx.beginPath()
      if (e.shiftKey) {
        let ellipseHeightRadius

        if (radiusY < 0 && radiusX > 0) {
          // 4th quarter (x; -y)
          ellipseHeightRadius = startDrawingPosition.left - radiusY
        } else if (radiusY < 0 && radiusX < 0) {
          // 3rd quarter (-x; -y)
          ellipseHeightRadius = startDrawingPosition.left + radiusY
        } else if (radiusY > 0 && radiusX < 0) {
          // 2nd quarter (-x; y)
          ellipseHeightRadius = startDrawingPosition.left - radiusY
        } else {
          // 1st quarter (x; y)
          ellipseHeightRadius = startDrawingPosition.left + radiusY
        }
        ctx.arc(ellipseHeightRadius, startDrawingPosition.top + radiusY, Math.abs(radiusY), 0, 2 * Math.PI)
      } else {
        ctx.ellipse(
          startDrawingPosition.left + radiusX,
          startDrawingPosition.top + radiusY,
          Math.abs(radiusX),
          Math.abs(radiusY),
          0,
          0,
          2 * Math.PI,
        )
      }
      ctx.stroke()
    }
  },

  onMouseUp: (setIsPainting: (payload: boolean) => void) => {
    setIsPainting(false)
  },
}
