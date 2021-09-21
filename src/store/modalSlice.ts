import { createSlice } from '@reduxjs/toolkit';

// using for displaying modal windows
export const modalSlice = createSlice({
  name: 'modal',
  initialState: {
    value: {
      isOpen: false,
      data: ''
    }
  },
  reducers: {
    openModal: (state, action) => {
      state.value = {
        isOpen: true,
        data: action.payload
      };
    },
    closeModal: (state) => {
      state.value = {
        isOpen: false,
        data: ''
      };
    }
  }
});

export const { openModal, closeModal } = modalSlice.actions;

export default modalSlice.reducer;
