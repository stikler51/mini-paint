import { createSlice } from '@reduxjs/toolkit';

export const artSlice = createSlice({
  name: 'art',
  initialState: {
    value: ''
  },
  reducers: {
    createNewArt: (state, action) => {
      state.value = action.payload;
    }
  }
});

export const { createNewArt } = artSlice.actions;

export default artSlice.reducer;
