type onMouseDownType = {
  e: MouseEvent
  ctx: CanvasRenderingContext2D
  canvasOffset: { top: number; left: number }
  setIsPainting: (payload: boolean) => void
}

type startPosition = {
  left: number
  top: number
}

const convertHexToRGBA = (hexCode: any) => {
  let hex = hexCode.replace('#', '')

  if (hex.length === 3) {
    hex = `${hex[0]}${hex[0]}${hex[1]}${hex[1]}${hex[2]}${hex[2]}`
  }

  const r = parseInt(hex.substring(0, 2), 16)
  const g = parseInt(hex.substring(2, 4), 16)
  const b = parseInt(hex.substring(4, 6), 16)

  return {
    r,
    g,
    b,
    a: 255,
  }
}

export default {
  onMouseDown: ({ e, ctx, canvasOffset }: onMouseDownType): startPosition => {
    const start: startPosition = {
      top: e.pageY - canvasOffset.top,
      left: e.pageX - canvasOffset.left,
    }
    const pixelStack: number[][] = [[start.left, start.top]]
    const dataImage = ctx.getImageData(0, 0, 760, 480)
    const fillColor = convertHexToRGBA(ctx.fillStyle)
    const startPixel = ctx.getImageData(start.left, start.top, 1, 1)

    function colorPixel(pixelPos: number) {
      dataImage.data[pixelPos] = fillColor.r
      dataImage.data[pixelPos + 1] = fillColor.g
      dataImage.data[pixelPos + 2] = fillColor.b
      dataImage.data[pixelPos + 3] = 255
    }

    function matchStartColor(pixelPos: number): boolean {
      const r = dataImage.data[pixelPos]
      const g = dataImage.data[pixelPos + 1]
      const b = dataImage.data[pixelPos + 2]
      return r === startPixel.data[0] && g === startPixel.data[1] && b === startPixel.data[2]
    }

    let pixelPosition = (start.left + start.top * 760) * 4

    if (
      dataImage.data[pixelPosition] === fillColor.r &&
      dataImage.data[pixelPosition + 1] === fillColor.g &&
      dataImage.data[pixelPosition + 2] === fillColor.b
    ) {
      return start
    }

    while (pixelStack.length) {
      const coord: any = pixelStack.pop()
      let y = coord[1]
      const x = coord[0]

      pixelPosition = (x + y * 760) * 4

      while (y > 0 && matchStartColor(pixelPosition)) {
        y -= 1
        pixelPosition -= 760 * 4
      }

      y += 1
      pixelPosition += 760 * 4

      let reachLeft = false
      let reachRight = false

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
