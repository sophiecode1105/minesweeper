import { configureStore } from '@reduxjs/toolkit';
import gameDifficultyReducer from './gameDifficulty';

export const store = configureStore({
  reducer: {
    gameDifficulty: gameDifficultyReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
