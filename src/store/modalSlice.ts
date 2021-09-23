import { createSlice } from '@reduxjs/toolkit'
import { ModalReduxState } from '../types/types'

// using for displaying modal windows
export const modalSlice = createSlice({
  name: 'modal',
  initialState: {
    value: {
      isOpen: false,
      data: '',
    },
  } as ModalReduxState,
  reducers: {
    openModal: (state: ModalReduxState, action: { payload: string }) => {
      state.value = {
        isOpen: true,
        data: action.payload,
      }
    },
    closeModal: (state: ModalReduxState) => {
      state.value = {
        isOpen: false,
        data: '',
      }
    },
  },
})

export const { openModal, closeModal } = modalSlice.actions

export default modalSlice.reducer
