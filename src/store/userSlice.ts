import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { UserReduxState } from '../types/types'
import { saveUser } from '../firebase/db'
import { UserObjectType, AuthorizationFormInputs } from '../types/types'
import { startLoading, stopLoading } from './loadingSlice'
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from 'firebase/auth'
import { auth } from '../firebase/firebase'

export const loginUser = createAsyncThunk(
  'user/loginUser',
  async ({ email, password }: AuthorizationFormInputs, thunkAPI) => {
    thunkAPI.dispatch(startLoading())
    return signInWithEmailAndPassword(auth, email, password)
      .then(({ user }) => {
        sessionStorage.setItem('mini-paint-loggedIn', 'true')
        thunkAPI.dispatch(stopLoading())
        return { uid: user.uid, email: user.email }
      })
      .catch((error) => {
        thunkAPI.dispatch(stopLoading())
        return error.message
      })
  },
)

export const signUpUser = createAsyncThunk(
  'user/signUpUser',
  async ({ email, password }: AuthorizationFormInputs, thunkAPI) => {
    thunkAPI.dispatch(startLoading())
    return createUserWithEmailAndPassword(auth, email, password)
      .then(({ user }) => {
        sessionStorage.setItem('mini-paint-loggedIn', 'true')
        saveUser(user.uid, email)
        thunkAPI.dispatch(stopLoading())
        return { uid: user.uid, email }
      })
      .catch((error) => {
        thunkAPI.dispatch(stopLoading())
        return error.message
      })
  },
)

export const logOutUser = createAsyncThunk('user/logOutUser', async (_, thunkAPI) => {
  thunkAPI.dispatch(startLoading())
  return signOut(auth)
    .then(() => {
      thunkAPI.dispatch(stopLoading())
      return null
    })
    .catch((error) => {
      thunkAPI.dispatch(stopLoading())
      return error.message
    })
})

// used for keeping information about authorized user and authorization errors
export const userSlice = createSlice({
  name: 'user',
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
      state.value = {
        user: state.value.user,
        loggedIn: state.value.loggedIn,
        errors: action.payload,
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.fulfilled, (state: UserReduxState, action: any) => {
        // console.log('extra', action)
        if (typeof action.payload === 'string') {
          // means, that it is error
          state.value = {
            user: null,
            loggedIn: false,
            errors: action.payload,
          }
        } else {
          state.value = {
            user: action.payload,
            loggedIn: true,
            errors: state.value.errors,
          }
        }
      })
      .addCase(signUpUser.fulfilled, (state: UserReduxState, action: any) => {
        // console.log('extra', action)
        if (typeof action.payload === 'string') {
          // means, that it is error
          state.value = {
            user: null,
            loggedIn: false,
            errors: action.payload,
          }
        } else {
          state.value = {
            user: action.payload,
            loggedIn: true,
            errors: state.value.errors,
          }
        }
      })
      .addCase(logOutUser.fulfilled, (state: UserReduxState) => {
        console.log('here')
        state.value = {
          user: null,
          loggedIn: false,
          errors: null,
        }
      })
  },
})

export const { login, logout, setError } = userSlice.actions

export default userSlice.reducer
