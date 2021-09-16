import { createSlice } from '@reduxjs/toolkit';

export const themeSlice = createSlice({
  name: 'theme',
  initialState: {
    value: 'light' // 'light' or 'dark'
  },
  reducers: {
    enableDarkTheme: (state) => {
      state.value = 'dark';
    },
    enableLightTheme: (state) => {
      state.value = 'light';
    }
  }
});

export const { enableDarkTheme, enableLightTheme } = themeSlice.actions;

export default themeSlice.reducer;
