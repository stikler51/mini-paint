import { configureStore } from '@reduxjs/toolkit';
import userReduser from './userSlice';
import loadingReducer from './loadingSlice';
import toolReducer from './toolSlice';

export default configureStore({
  reducer: {
    user: userReduser,
    loading: loadingReducer,
    tool: toolReducer
  }
});
