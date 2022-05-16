import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { GameDifficulty } from '../types/difficulty';
import { GameStatus } from '../types/status';

const initialState: GameStatus = {
  status: 'playing',
  img: 'img/curious.png',
};

export const gameStatusSlice = createSlice({
  name: 'gameDifficulty',
  initialState,
  reducers: {
    updateDifficulty: (state, action: PayloadAction<{ status: GameStatus }>) => {
      state = action.payload.status;
      return state;
    },
  },
});

export const { updateDifficulty } = gameStatusSlice.actions;
export default gameStatusSlice.reducer;
