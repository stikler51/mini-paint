import { configureStore } from '@reduxjs/toolkit';
import userReduser from './userSlice';
import loadingReducer from './loadingSlice';
import toolReducer from './toolSlice';
import artReducer from './artSlice';
import modalReducer from './modalSlice';
import themeReducer from './themeSlice';

export default configureStore({
  reducer: {
    user: userReduser,
    loading: loadingReducer,
    tool: toolReducer,
    art: artReducer,
    modal: modalReducer,
    theme: themeReducer
  }
});
