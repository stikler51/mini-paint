import { createSlice } from '@reduxjs/toolkit'
import { UserReduxState, UserObjectType } from '../types/types'

// used for keeping information about authorized user and authorization errors
export const userSlice = createSlice({
  name: 'counter',
  initialState: {
    value: {
      user: null,
      loggedIn: false,
      errors: null,
    },
  } as UserReduxState,
  reducers: {
    login: (state: UserReduxState, action: { payload: null | UserObjectType }) => {
      state.value = {
        user: action.payload,
        loggedIn: true,
        errors: state.value.errors,
      }
    },
    logout: (state: UserReduxState) => {
      state.value = {
        user: null,
        loggedIn: false,
        errors: state.value.errors,
      }
    },
    setError: (state: UserReduxState, action: { payload: string | null }) => {
      state.value.errors = action.payload
    },
  },
})

export const { login, logout, setError } = userSlice.actions

export default userSlice.reducer
