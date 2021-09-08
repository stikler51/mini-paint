import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'counter',
  initialState: {
    value: {
      user: null,
      loggedIn: false
    }
  },
  reducers: {
    login: (state, action) => {
      state.value = {
        user: action.payload,
        loggedIn: true
      };
    },
    logout: (state) => {
      state.value = {
        user: null,
        loggedIn: false
      };
    }
  }
});

export const { login, logout } = userSlice.actions;

export default userSlice.reducer;
