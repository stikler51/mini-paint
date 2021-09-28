import { ReactChild } from 'react'

export type UserObjectType = {
  email: string
  uid: string
}

export type UserReduxSliceType = {
  user: null | UserObjectType
  loggedIn: boolean
  errors: string | null
}

export type UserReduxState = {
  value: UserReduxSliceType
}

export type ToolReduxSliceType = {
  activeTool: string
  color: string
  lineWidth: number
}

export type ToolReduxState = {
  value: ToolReduxSliceType
}

export type ModalReduxSliceType = {
  isOpen: boolean
  data: string
}

export type ModalReduxState = {
  value: ModalReduxSliceType
}

export type ArtReduxSliceType = {
  currentPosition: number
  artHistory: string[]
  manualChanging: boolean
}

export type ArtReduxState = {
  value: ArtReduxSliceType
}

export type LoadingReduxState = {
  value: boolean
}

export type ThemeReduxState = {
  value: 'light' | 'dark'
}

export type ToolOnMouseDown = {
  e: React.MouseEvent
  canvasOffset: { top: number; left: number }
  setIsPainting: (payload: boolean) => void
  ctx: CanvasRenderingContext2D | undefined
}

export type ToolOnMouseMove = {
  e: React.MouseEvent
  ctx: CanvasRenderingContext2D | undefined
  canvasOffset: { top: number; left: number }
  isPainting: boolean
  startDrawingPosition: { top: number; left: number }
  canvasData: ImageData | undefined
}

export type Tool = {
  [key: string]: {
    onMouseDown: ({ e, ctx, canvasOffset, setIsPainting }: ToolOnMouseDown) => SinglePixel
    onMouseMove: ({ e, ctx, canvasOffset, isPainting, startDrawingPosition, canvasData }: ToolOnMouseMove) => void
  }
}

export type SinglePixel = {
  top: number
  left: number
}

export type Rectangle = {
  width: number
  height: number
}

export type RGBColor = {
  r: number
  g: number
  b: number
}

export type ToolButton = {
  value: string
  icon: string
}

export type RouteProps = {
  path: string
}

export type PrivateRouteProps = {
  path: string
  redirect: string
  children: JSX.Element
  inverse?: boolean // defines inverse render logic
}

export type AuthorizationFormInputs = {
  email: string
  password: string
}
