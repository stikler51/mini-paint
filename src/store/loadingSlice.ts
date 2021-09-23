import { createSlice } from '@reduxjs/toolkit'
import { LoadingReduxState } from '../types/types'

// used for displaying loading indicator
export const loadingSlice = createSlice({
  name: 'loading',
  initialState: {
    value: true,
  } as LoadingReduxState,
  reducers: {
    startLoading: (state: LoadingReduxState) => {
      state.value = true
    },
    stopLoading: (state: LoadingReduxState) => {
      state.value = false
    },
  },
})

export const { startLoading, stopLoading } = loadingSlice.actions

export default loadingSlice.reducer
