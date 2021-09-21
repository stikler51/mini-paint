import React, { useRef, useEffect, useState } from 'react'
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

const DrawingArea = () => {
  const canvas = useRef<HTMLCanvasElement | null>(null)
  const [isPainting, setIsPainting] = useState<boolean | null>(false)
  const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null)
  const [canvasOffset, setCanvasOffset] = useState<{ left: number; top: number }>({ left: 0, top: 0 })
  const [startDrawingPosition, setStartDrawingPosition] = useState<{ left: number; top: number }>({ left: 0, top: 0 })
  const [canvasData, setCanvasData] = useState<ImageData | null>(null)
  const { artId } = useParams<{ artId: string }>()
  const history = useHistory()

  const { activeTool, color, lineWidth } = useAppSelector<{ activeTool: string; color: string; lineWidth: number }>(
    (state) => state.tool.value,
  )
  const theme = useAppSelector<string>((state) => state.theme.value)
  const { currentPosition, artHistory, manualChanging } = useAppSelector<{
    currentPosition: number
    artHistory: any[]
    manualChanging: boolean
  }>((state) => state.art.value)
  const dispatch = useAppDispatch()

  const tools: any = {
    pen,
    rectangle,
    ellipse,
    line,
    bucket,
    eraser,
  }

  useEffect(() => {
    const canvasCtx = canvas.current?.getContext('2d', { alpha: false })
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
      setCanvasOffset({
        left: canvas.current.offsetLeft,
        top: canvas.current.offsetTop,
      })
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
      const image = new Image()
      image.onload = function () {
        ctx.drawImage(image, 0, 0, 760, 480)
      }
      image.src = artHistory[currentPosition]
    }
  }, [currentPosition])

  // Every tool has 3 methods : onMouseDown, onMouseMove, onMouseUp

  const onMouseDown = (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>): void => {
    // Different tools requires different params, so here all needed params for
    // all tools passed as object. And every tool using only needed for it values
    const startPosition = tools[activeTool].onMouseDown({
      e,
      ctx,
      canvasOffset,
      setIsPainting,
    }) // get pixel where user started paint
    setStartDrawingPosition(startPosition) // saving it.
    if (ctx) {
      // saving canvas data to restore it on interactive painting
      // when draw rectangles / ellipses / lines
      setCanvasData(ctx.getImageData(0, 0, 760, 480))
    }
  }

  const onMouseMove = (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>): void => {
    // Different tools requires different params, so here all needed params for
    // all tools passed as object. And every tool using only needed for it values
    tools[activeTool].onMouseMove({
      e,
      ctx,
      canvasOffset,
      isPainting,
      startDrawingPosition,
      canvasData,
    })
  }

  const onMouseUp = () => {
    // tools[activeTool].onMouseUp(setIsPainting);
    setIsPainting(false)
    // saving changes to history on every paint action
    dispatch(pushActionInHistory(canvas.current?.toDataURL()))
  }

  // stop painting if mouse leave canvas area
  const onMouseLeave = () => {
    if (isPainting) {
      setIsPainting(false)
      dispatch(pushActionInHistory(canvas.current?.toDataURL()))
    }
  }

  // cleaning up canvas
  const clearCanvas = () => {
    const sure = window.confirm('Are you sure?')
    if (sure && ctx) {
      ctx.fillStyle = '#FFFFFF'
      ctx.fillRect(0, 0, 760, 480)
    }
  }

  // saving art to database
  const saveArtToDb = () => {
    if (canvas.current) {
      const dataURL = canvas.current?.toDataURL()
      saveArt(dataURL).then((id) => history.push(`/editor/${id}`))
    }
  }

  // updating existing art in database
  const updateArtInDb = () => {
    if (canvas.current) {
      const dataURL = canvas.current?.toDataURL()
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
