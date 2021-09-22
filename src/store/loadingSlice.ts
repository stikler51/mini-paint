import { createSlice } from '@reduxjs/toolkit'

type State = {
  value: boolean
}

// used for displaying loading indicator
export const loadingSlice = createSlice({
  name: 'loading',
  initialState: {
    value: true,
  } as State,
  reducers: {
    startLoading: (state: State) => {
      state.value = true
    },
    stopLoading: (state: State) => {
      state.value = false
    },
  },
})

export const { startLoading, stopLoading } = loadingSlice.actions

export default loadingSlice.reducer
