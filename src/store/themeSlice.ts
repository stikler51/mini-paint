import { createSlice } from '@reduxjs/toolkit'

// used for changing theme
// if need to change, just change default value here
const defaultTheme = 'light' // 'light' or 'dark'

export const themeSlice = createSlice({
  name: 'theme',
  initialState: {
    value: defaultTheme,
  },
  reducers: {
    enableDarkTheme: (state) => {
      state.value = 'dark'
    },
    enableLightTheme: (state) => {
      state.value = 'light'
    },
  },
})

export const { enableDarkTheme, enableLightTheme } = themeSlice.actions

export default themeSlice.reducer
