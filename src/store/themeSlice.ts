import { createSlice } from '@reduxjs/toolkit'

type State = {
  value: 'light' | 'dark'
}

// used for changing theme
// if need to change, just change default value here
const defaultTheme: string = 'light' // 'light' or 'dark'

export const themeSlice = createSlice({
  name: 'theme',
  initialState: {
    value: defaultTheme,
  } as State,
  reducers: {
    enableDarkTheme: (state: State) => {
      state.value = 'dark'
    },
    enableLightTheme: (state: State) => {
      state.value = 'light'
    },
  },
})

export const { enableDarkTheme, enableLightTheme } = themeSlice.actions

export default themeSlice.reducer
