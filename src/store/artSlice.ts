import { createSlice } from '@reduxjs/toolkit'
import { ArtReduxState } from '../types/types'

// used for saving art change history (undo/redo actions)
// artHistory - array of Base64 strings images
export const artSlice = createSlice({
  name: 'art',
  initialState: {
    value: {
      artHistory: [],
      currentPosition: 0,
      manualChanging: false,
    },
  } as ArtReduxState,
  reducers: {
    createNewArt: (state: ArtReduxState) => {
      state.value = {
        artHistory: [],
        currentPosition: state.value.currentPosition,
        manualChanging: false,
      }
    },
    pushActionInHistory: (state: ArtReduxState, action: { payload: string }) => {
      const oldState = [...state.value.artHistory]
      // maximum history stack size = 20
      // if need to change, change here and in components/editor/historyActions/historyPanel.tsx
      const maxStackSize = 20
      if (state.value.artHistory.length >= maxStackSize) {
        oldState.shift()
      }
      state.value = {
        artHistory: [...oldState, action.payload],
        currentPosition: oldState.length,
        manualChanging: false,
      }
    },
    prevArtState: (state: ArtReduxState) => {
      state.value = {
        artHistory: [...state.value.artHistory],
        currentPosition: state.value.currentPosition - 1,
        manualChanging: true,
      }
    },
    nextArtState: (state: ArtReduxState) => {
      state.value = {
        artHistory: [...state.value.artHistory],
        currentPosition: state.value.currentPosition + 1,
        manualChanging: true,
      }
    },
  },
})

export const { createNewArt, pushActionInHistory, prevArtState, nextArtState } = artSlice.actions

export default artSlice.reducer
