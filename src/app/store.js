import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import authReducer from '../features/authSlice';
import thunk from 'redux-thunk'; // Importa Redux Thunk

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
  middleware: [...getDefaultMiddleware(), thunk], // Agrega Redux Thunk al middleware
});
