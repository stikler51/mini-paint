import { configureStore } from '@reduxjs/toolkit'
import userReducer from './userSlice'
import loadingReducer from './loadingSlice'
import toolReducer from './toolSlice'
import artReducer from './artSlice'
import modalReducer from './modalSlice'
import themeReducer from './themeSlice'
import filterReducer from './filterSlice'
import galleryReducer from './gallerySlice'

const store = configureStore({
  reducer: {
    user: userReducer,
    loading: loadingReducer,
    tool: toolReducer,
    art: artReducer,
    modal: modalReducer,
    theme: themeReducer,
    filter: filterReducer,
    gallery: galleryReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export default store
