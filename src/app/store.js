import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import authReducer from '../features/authSlice';
import postReducer from '../features/postSlice';
import thunk from 'redux-thunk'; // Importa Redux Thunk

export const store = configureStore({
  reducer: {
    auth: authReducer,
    posts: postReducer,

  },
  middleware: [...getDefaultMiddleware(), thunk], // Agrega Redux Thunk al middleware
});
