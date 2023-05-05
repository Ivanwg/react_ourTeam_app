import { configureStore } from '@reduxjs/toolkit'
import user from './slices/user';
import collegues from './slices/collegues';
import { useDispatch } from 'react-redux';

export const store = configureStore({
  reducer: {
    user,
    collegues
  },
})


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>()