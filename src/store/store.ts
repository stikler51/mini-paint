import { configureStore } from '@reduxjs/toolkit'
import userReduser from './userSlice'
import loadingReducer from './loadingSlice'
import toolReducer from './toolSlice'
import artReducer from './artSlice'
import modalReducer from './modalSlice'
import themeReducer from './themeSlice'

const store = configureStore({
  reducer: {
    user: userReduser,
    loading: loadingReducer,
    tool: toolReducer,
    art: artReducer,
    modal: modalReducer,
    theme: themeReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export default store
