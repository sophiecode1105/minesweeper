import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { GameDifficulty } from '../types/difficulty';

const initialState: GameDifficulty = {
  name: 'beginner',
  values: [9, 9, 10],
  width: '266px',
};

export const gameDifficultySlice = createSlice({
  name: 'gameDifficulty',
  initialState,
  reducers: {
    updateDifficulty: (state, action: PayloadAction<{ difficulty: GameDifficulty }>) => {
      state = action.payload.difficulty;
      return state;
    },
  },
});

export const { updateDifficulty } = gameDifficultySlice.actions;
export default gameDifficultySlice.reducer;
