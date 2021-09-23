import { createSlice } from '@reduxjs/toolkit'
import { ToolReduxState } from '../types/types'

// used for setting up tools
export const toolSlice = createSlice({
  name: 'tool',
  initialState: {
    value: {
      activeTool: 'pen',
      color: '#000000',
      lineWidth: 1,
    },
  } as ToolReduxState,
  reducers: {
    enableTool: (state: ToolReduxState, action: { payload: string }) => {
      state.value = {
        activeTool: action.payload,
        color: state.value.color,
        lineWidth: state.value.lineWidth,
      }
    },
    setColor: (state: ToolReduxState, action: { payload: string }) => {
      state.value = {
        activeTool: state.value.activeTool,
        color: action.payload,
        lineWidth: state.value.lineWidth,
      }
    },
    setLineWidth: (state: ToolReduxState, action: { payload: number }) => {
      state.value = {
        activeTool: state.value.activeTool,
        color: state.value.color,
        lineWidth: action.payload,
      }
    },
  },
})

export const { enableTool, setColor, setLineWidth } = toolSlice.actions

export default toolSlice.reducer
