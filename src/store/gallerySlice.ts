import { createSlice } from '@reduxjs/toolkit'
import { galleryReduxState } from '../types/types'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { startLoading, stopLoading } from './loadingSlice'
import { db } from '../firebase/firebase'
import { collection, query, doc, getDocs, deleteDoc, where } from 'firebase/firestore'

export const loadAllArts = createAsyncThunk('gallery/loadAllArts', async (filter: string, thunkAPI) => {
  thunkAPI.dispatch(startLoading())
  let q = query(collection(db, 'art'))
  if (filter) {
    q = query(collection(db, 'art'), where('email', '==', filter))
  }
  return getDocs(q)
    .then((data) => {
      return data.docs
    })
    .then((arts) => {
      thunkAPI.dispatch(stopLoading())
      return arts.map((art) => {
        return {
          id: art.id,
          imageData: art.data().imageData,
          uid: art.data().uid,
          email: art.data().email,
          created: art.data().created.seconds,
        }
      })
    })
})

export const removeArt = createAsyncThunk('gallery/removeArt', async (id: string, thunkAPI) => {
  thunkAPI.dispatch(startLoading())
  return deleteDoc(doc(db, 'art', id)).then(() => {
    thunkAPI.dispatch(stopLoading())
    return id
  })
})

// used for displaying loading indicator
export const gallerySlice = createSlice({
  name: 'gallery',
  initialState: {
    value: [],
  } as galleryReduxState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadAllArts.fulfilled, (state: galleryReduxState, action: any) => {
        state.value = action.payload
      })
      .addCase(removeArt.fulfilled, (state: galleryReduxState, action: any) => {
        state.value = state.value.filter((art) => art.id !== action.payload)
      })
  },
})

export default gallerySlice.reducer
