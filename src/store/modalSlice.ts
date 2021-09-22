import { createSlice } from '@reduxjs/toolkit'

type State = {
  value: {
    isOpen: boolean
    data: string
  }
}

// using for displaying modal windows
export const modalSlice = createSlice({
  name: 'modal',
  initialState: {
    value: {
      isOpen: false,
      data: '',
    },
  } as State,
  reducers: {
    openModal: (state: State, action: { payload: string }) => {
      state.value = {
        isOpen: true,
        data: action.payload,
      }
    },
    closeModal: (state: State) => {
      state.value = {
        isOpen: false,
        data: '',
      }
    },
  },
})

export const { openModal, closeModal } = modalSlice.actions

export default modalSlice.reducer
