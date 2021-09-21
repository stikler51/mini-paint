import { createSlice } from '@reduxjs/toolkit'

// used for keeping information about authorized user and authorization errors
export const userSlice = createSlice({
  name: 'counter',
  initialState: {
    value: {
      user: null,
      loggedIn: false,
      errors: null,
    },
  },
  reducers: {
    login: (state, action) => {
      state.value = {
        user: action.payload,
        loggedIn: true,
        errors: state.value.errors,
      }
    },
    logout: (state) => {
      state.value = {
        user: null,
        loggedIn: false,
        errors: state.value.errors,
      }
    },
    setError: (state, action) => {
      state.value.errors = action.payload
    },
  },
})

export const { login, logout, setError } = userSlice.actions

export default userSlice.reducer
