import { createSlice } from '@reduxjs/toolkit';

export const artSlice = createSlice({
  name: 'art',
  initialState: {
    value: {
      artHistory: [],
      currentPosition: 0,
      manualChanging: false
    }
  },
  reducers: {
    createNewArt: (state) => {
      state.value = {
        artHistory: [],
        currentPosition: state.value.currentPosition,
        manualChanging: false
      };
    },
    pushActionInHistory: (state: any, action) => {
      const oldState = [...state.value.artHistory];
      if (state.value.artHistory.length >= 20) {
        oldState.shift();
      }
      state.value = {
        artHistory: [...oldState, action.payload],
        currentPosition: oldState.length,
        manualChanging: false
      };
    },
    prevArtState: (state) => {
      state.value = {
        artHistory: [...state.value.artHistory],
        currentPosition: state.value.currentPosition - 1,
        manualChanging: true
      };
    },
    nextArtState: (state) => {
      state.value = {
        artHistory: [...state.value.artHistory],
        currentPosition: state.value.currentPosition + 1,
        manualChanging: true
      };
    }
  }
});

export const {
  createNewArt,
  pushActionInHistory,
  prevArtState,
  nextArtState
} = artSlice.actions;

export default artSlice.reducer;
