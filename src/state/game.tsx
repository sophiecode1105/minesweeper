import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { GameDifficulty } from '../types/difficulty';
import { GameStatus } from '../types/status';
import { EMPTY_BEGINNER_BOARD } from '../utils/constants/board';
import { BEGINNER } from '../utils/constants/difficulty';
import { PLAYING } from '../utils/constants/status';

const initialState = {
  initialized: false,
  status: PLAYING,
  difficulty: BEGINNER,
  board: EMPTY_BEGINNER_BOARD,
};

export const gameStatusSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    changeGameStatus: (state, action: PayloadAction<{ status: GameStatus }>) => {
      state.status = action.payload.status;
    },
    changeGameDifficulty: (state, action: PayloadAction<{ difficulty: GameDifficulty }>) => {
      state.difficulty = action.payload.difficulty;
    },
  },
});

export const { changeGameStatus, changeGameDifficulty } = gameStatusSlice.actions;
export default gameStatusSlice.reducer;
