import { configureStore } from '@reduxjs/toolkit';
import userReduser from './userSlice';
import loadingReducer from './loadingSlice';

export default configureStore({
  reducer: {
    user: userReduser,
    loading: loadingReducer
  }
});
