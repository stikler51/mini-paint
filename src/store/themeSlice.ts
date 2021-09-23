import { createSlice } from '@reduxjs/toolkit'
import { ThemeReduxState } from '../types/types'

// used for changing theme
// if need to change, just change default value here
const defaultTheme: string = 'light' // 'light' or 'dark'

export const themeSlice = createSlice({
  name: 'theme',
  initialState: {
    value: defaultTheme,
  } as ThemeReduxState,
  reducers: {
    enableDarkTheme: (state: ThemeReduxState) => {
      state.value = 'dark'
    },
    enableLightTheme: (state: ThemeReduxState) => {
      state.value = 'light'
    },
  },
})

export const { enableDarkTheme, enableLightTheme } = themeSlice.actions

export default themeSlice.reducer
