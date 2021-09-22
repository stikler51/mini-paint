import { createSlice } from '@reduxjs/toolkit'

type User = {
  uid: string
  email: string
}

type State = {
  value: {
    user: null | User
    loggedIn: boolean
    errors: string | null
  }
}

// used for keeping information about authorized user and authorization errors
export const userSlice = createSlice({
  name: 'counter',
  initialState: {
    value: {
      user: null,
      loggedIn: false,
      errors: null,
    },
  } as State,
  reducers: {
    login: (state: State, action: { payload: null | User }) => {
      state.value = {
        user: action.payload,
        loggedIn: true,
        errors: state.value.errors,
      }
    },
    logout: (state: State) => {
      state.value = {
        user: null,
        loggedIn: false,
        errors: state.value.errors,
      }
    },
    setError: (state: State, action: { payload: string | null }) => {
      state.value.errors = action.payload
    },
  },
})

export const { login, logout, setError } = userSlice.actions

export default userSlice.reducer
