import React, { useRef, useEffect, useState, MouseEvent } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { useAppSelector, useAppDispatch } from '../../../store/hooks'
import { pushActionInHistory, createNewArt } from '../../../store/artSlice'
import styles from './drawingArea.module.scss'
import pen from '../drawingTools/pen'
import rectangle from '../drawingTools/rectangle'
import ellipse from '../drawingTools/ellipse'
import line from '../drawingTools/line'
import bucket from '../drawingTools/paintBucket'
import eraser from '../drawingTools/eraser'
import { saveArt, getOneArt, updateArt } from '../../../firebase/db'

type ToolOnMouseDown = {
  e: MouseEvent
  canvasOffset: { top: number; left: number }
  setIsPainting: (payload: boolean) => void
  ctx: CanvasRenderingContext2D | undefined
}

type ToolOnMouseMove = {
  e: MouseEvent
  ctx: CanvasRenderingContext2D | undefined
  canvasOffset: { top: number; left: number }
  isPainting: boolean
  startDrawingPosition: { top: number; left: number }
  canvasData: ImageData | undefined
}

type Tool = {
  [key: string]: {
    onMouseDown: ({ e, ctx, canvasOffset, setIsPainting }: ToolOnMouseDown) => { top: number; left: number }
    onMouseMove: ({ e, ctx, canvasOffset, isPainting, startDrawingPosition, canvasData }: ToolOnMouseMove) => void
    // onMouseUp: ({}: any) => void
  }
}

const DrawingArea = () => {
  const canvas = useRef<HTMLCanvasElement | null>(null)
  const [isPainting, setIsPainting] = useState<boolean>(false) // indicator when mouse left button is pressed
  const [ctx, setCtx] = useState<CanvasRenderingContext2D | undefined>() // canvas context
  const [canvasData, setCanvasData] = useState<ImageData | undefined>()
  // canvas left top corner position
  const [canvasOffset, setCanvasOffset] = useState<{ left: number; top: number }>({ left: 0, top: 0 })
  // position of pixel, where drawing is started
  const [startDrawingPosition, setStartDrawingPosition] = useState<{ left: number; top: number }>({ left: 0, top: 0 })
  const { artId } = useParams<{ artId: string }>() // id of image from url string
  const history = useHistory<History>()
  // active tool and tool settings from redux store
  const { activeTool, color, lineWidth } = useAppSelector<{ activeTool: string; color: string; lineWidth: number }>(
    (state) => state.tool.value,
  )
  const theme = useAppSelector<string>((state) => state.theme.value) // active theme
  // history of changing image from redux store
  const { currentPosition, artHistory, manualChanging } = useAppSelector<{
    currentPosition: number
    artHistory: string[]
    manualChanging: boolean
  }>((state) => state.art.value)
  const dispatch = useAppDispatch()

  // TODO: add type
  const tools: Tool = {
    pen,
    rectangle,
    ellipse,
    line,
    bucket,
    eraser,
  }

  useEffect(() => {
    const canvasCtx: CanvasRenderingContext2D | null | undefined = canvas.current?.getContext('2d', { alpha: false })
    if (canvasCtx && canvas.current) {
      canvasCtx.fillStyle = '#FFFFFF'
      canvasCtx.fillRect(0, 0, 760, 480) // make white bg

      canvasCtx.strokeStyle = color // set initial stroke color
      canvasCtx.fillStyle = color // set initial fill color
      canvasCtx.lineWidth = lineWidth // set initial line width

      if (artId) {
        // if url has id param, fetching imagedata from firestore by id
        getOneArt(artId).then((art) => {
          const image = new Image()
          image.src = art.data()?.imageData
          image.onload = function () {
            // needed because of not always image can render at time
            canvasCtx.drawImage(image, 0, 0, 760, 480) // drawing fetched art in canvas
          }
        })
      }
      dispatch(createNewArt()) // cleaning up previous image history state

      // set initial art state (just white rectangle)
      dispatch(pushActionInHistory(canvas.current?.toDataURL()))

      // needed to use useState because on every rerender canvas context set ups to null
      setCtx(canvasCtx)
      setCanvasOffset({ left: canvas.current.offsetLeft, top: canvas.current.offsetTop })
    }
  }, [])

  // changing active tool
  useEffect(() => {
    if (ctx) {
      ctx.strokeStyle = color
    }
  }, [activeTool])

  // changing color
  useEffect(() => {
    if (ctx) {
      ctx.strokeStyle = color
      ctx.fillStyle = color
    }
  }, [color])

  // changing lineWidth
  useEffect(() => {
    if (ctx) {
      ctx.lineWidth = lineWidth
    }
  }, [lineWidth])

  // using undo/redo actions
  useEffect(() => {
    if (ctx && manualChanging) {
      const image: HTMLImageElement = new Image()
      image.onload = function () {
        ctx.drawImage(image, 0, 0, 760, 480)
      }
      image.src = artHistory[currentPosition]
    }
  }, [currentPosition])

  // Every tool has 3 methods : onMouseDown, onMouseMove, onMouseUp

  const onMouseDown = (e: MouseEvent): void => {
    // Different tools requires different params, so here all needed params for
    // all tools passed as object. And every tool using only needed for it values
    const startPosition = tools[activeTool].onMouseDown({ e, ctx, canvasOffset, setIsPainting }) // get pixel where user started paint
    setStartDrawingPosition(startPosition) // saving it.
    if (ctx) {
      // saving canvas data to restore it on interactive painting
      // when draw rectangles / ellipses / lines
      setCanvasData(ctx.getImageData(0, 0, 760, 480))
    }
  }

  const onMouseMove = (e: MouseEvent): void => {
    // Different tools requires different params, so here all needed params for
    // all tools passed as object. And every tool using only needed for it values
    tools[activeTool].onMouseMove({ e, ctx, canvasOffset, isPainting, startDrawingPosition, canvasData })
  }

  const onMouseUp = () => {
    // tools[activeTool].onMouseUp(setIsPainting);
    setIsPainting(false)
    // saving changes to history on every paint action
    if (canvas && canvas.current) {
      dispatch(pushActionInHistory(canvas.current.toDataURL()))
    }
  }

  // stop painting if mouse leave canvas area
  const onMouseLeave = () => {
    if (isPainting) {
      setIsPainting(false)
      if (canvas && canvas.current) {
        dispatch(pushActionInHistory(canvas.current.toDataURL()))
      }
    }
  }

  // cleaning up canvas
  const clearCanvas = () => {
    const sure: boolean = window.confirm('Are you sure?')
    if (sure && ctx) {
      ctx.fillStyle = '#FFFFFF'
      ctx.fillRect(0, 0, 760, 480)
    }
  }

  // saving art to database
  const saveArtToDb = () => {
    if (canvas.current) {
      const dataURL: string = canvas.current?.toDataURL()
      saveArt(dataURL).then((id) => history.push(`/editor/${id}`))
    }
  }

  // updating existing art in database
  const updateArtInDb = () => {
    if (canvas.current) {
      const dataURL: string = canvas.current?.toDataURL()
      updateArt(dataURL, artId)
    }
  }

  return (
    <div className={styles[theme]}>
      <canvas
        ref={canvas}
        id="canvas"
        onMouseDown={(e) => onMouseDown(e)}
        onMouseMove={(e) => onMouseMove(e)}
        onMouseUp={() => onMouseUp()}
        onMouseLeave={() => onMouseLeave()}
        width="760px"
        height="480px"
      />

      <div className={styles.bottomPanel}>
        <button type="button" className="btn btn-warning" onClick={clearCanvas}>
          Clear
        </button>
        <button type="button" className="btn btn-success" onClick={artId ? updateArtInDb : saveArtToDb}>
          {artId ? 'Update' : 'Save'}
        </button>
      </div>
    </div>
  )
}

export default DrawingArea
