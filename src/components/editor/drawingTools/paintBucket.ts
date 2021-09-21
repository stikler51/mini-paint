type OnMouseDownType = {
  e: MouseEvent
  ctx: CanvasRenderingContext2D
  canvasOffset: { top: number; left: number }
  setIsPainting: (payload: boolean) => void
}

type StartPosition = {
  left: number
  top: number
}

const convertHexToRGBA = (
  hexCode: string | CanvasPattern | CanvasGradient,
): { r: number; g: number; b: number; a: number } => {
  let hex: string = hexCode.toString().replace('#', '')

  if (hex.length === 3) {
    hex = `${hex[0]}${hex[0]}${hex[1]}${hex[1]}${hex[2]}${hex[2]}`
  }

  const r: number = parseInt(hex.substring(0, 2), 16)
  const g: number = parseInt(hex.substring(2, 4), 16)
  const b: number = parseInt(hex.substring(4, 6), 16)

  return { r, g, b, a: 255 }
}

export default {
  onMouseDown: ({ e, ctx, canvasOffset }: OnMouseDownType): StartPosition => {
    const start: StartPosition = {
      top: e.pageY - canvasOffset.top,
      left: e.pageX - canvasOffset.left,
    }
    const pixelStack: number[][] = [[start.left, start.top]]
    const dataImage: ImageData = ctx.getImageData(0, 0, 760, 480)
    const fillColor: { r: number; g: number; b: number; a: number } = convertHexToRGBA(ctx.fillStyle)
    const startPixel: ImageData = ctx.getImageData(start.left, start.top, 1, 1)

    function colorPixel(pixelPos: number): void {
      dataImage.data[pixelPos] = fillColor.r
      dataImage.data[pixelPos + 1] = fillColor.g
      dataImage.data[pixelPos + 2] = fillColor.b
      dataImage.data[pixelPos + 3] = 255
    }

    function matchStartColor(pixelPos: number): boolean {
      const r: number = dataImage.data[pixelPos]
      const g: number = dataImage.data[pixelPos + 1]
      const b: number = dataImage.data[pixelPos + 2]
      return r === startPixel.data[0] && g === startPixel.data[1] && b === startPixel.data[2]
    }

    let pixelPosition: number = (start.left + start.top * 760) * 4

    if (
      dataImage.data[pixelPosition] === fillColor.r &&
      dataImage.data[pixelPosition + 1] === fillColor.g &&
      dataImage.data[pixelPosition + 2] === fillColor.b
    ) {
      return start
    }

    while (pixelStack.length) {
      const coord: number[] | undefined = pixelStack.pop()
      let y: number = 0
      let x: number = 0
      if (coord?.length) {
        y = coord[1]
        x = coord[0]
      }
      pixelPosition = (x + y * 760) * 4

      while (y > 0 && matchStartColor(pixelPosition)) {
        y -= 1
        pixelPosition -= 760 * 4
      }

      y += 1
      pixelPosition += 760 * 4

      let reachLeft: boolean = false
      let reachRight: boolean = false

      while (y < 480 && matchStartColor(pixelPosition)) {
        colorPixel(pixelPosition)

        if (x > 0 && matchStartColor(pixelPosition - 4)) {
          if (!reachLeft) {
            pixelStack.push([x - 1, y])
            reachLeft = true
          }
        } else if (reachLeft) {
          reachLeft = false
        }

        if (x < 760 && matchStartColor(pixelPosition + 4)) {
          if (!reachRight) {
            pixelStack.push([x + 1, y])
            reachRight = true
          }
        } else if (reachRight) {
          reachRight = false
        }

        y += 1
        pixelPosition += 760 * 4
      }

      ctx.putImageData(dataImage, 0, 0)
    }

    return start
  },

  onMouseMove: (): void => {},

  onMouseUp: (): void => {},
}
