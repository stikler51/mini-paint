import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'counter',
  initialState: {
    value: {
      user: null,
      loggedIn: false,
      errors: null
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
    },
    setError: (state, action) => {
      state.value.errors = action.payload;
    }
  }
});

export const { login, logout, setError } = userSlice.actions;

export default userSlice.reducer;
