import { createSlice } from '@reduxjs/toolkit'
import { FilterReduxState } from '../types/types'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { startLoading, stopLoading } from './loadingSlice'
import { db } from '../firebase/firebase'
import { collection, query, getDocs } from 'firebase/firestore'

export const loadAllUsers = createAsyncThunk('filter/loadAllUsers', async (_, thunkAPI) => {
  thunkAPI.dispatch(startLoading())
  return getDocs(query(collection(db, 'users')))
    .then(({ docs }) => {
      return docs.map((user) => user.data())
    })
    .then((users) => {
      thunkAPI.dispatch(stopLoading())
      return users.map((u) => {
        return { uid: u.uid, email: u.email }
      })
    })
})

// used for displaying loading indicator
export const FilterSlice = createSlice({
  name: 'filter',
  initialState: {
    value: {
      users: [],
      selectedUser: '',
    },
  } as FilterReduxState,
  reducers: {
    filterByUser: (state: FilterReduxState, action: any) => {
      state.value = {
        users: state.value.users,
        selectedUser: action.payload,
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadAllUsers.fulfilled, (state: FilterReduxState, action: any) => {
      state.value = {
        users: action.payload,
        selectedUser: state.value.selectedUser,
      }
    })
  },
})

export const { filterByUser } = FilterSlice.actions

export default FilterSlice.reducer
