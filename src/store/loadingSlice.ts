import { createSlice } from '@reduxjs/toolkit'

// used for displaying loading indicator
export const loadingSlice = createSlice({
  name: 'loading',
  initialState: {
    value: true,
  },
  reducers: {
    startLoading: (state) => {
      state.value = true
    },
    stopLoading: (state) => {
      state.value = false
    },
  },
})

export const { startLoading, stopLoading } = loadingSlice.actions

export default loadingSlice.reducer
