import { configureStore } from '@reduxjs/toolkit';
import gameyReducer from './game';

export const store = configureStore({
  reducer: {
    game: gameyReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
