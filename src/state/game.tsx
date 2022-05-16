import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DifficultyBoard, GameDifficulty } from '../types/difficulty';
import { GameStatus } from '../types/status';
import { BEGINNER_BOARD, EMPTY_BEGINNER_BOARD, EXPERT_BOARD, INTERMEDIATE_BOARD } from '../utils/constants/board';
import { BEGINNER } from '../utils/constants/difficulty';
import { PLAYING } from '../utils/constants/status';

const initialState = {
  initialized: false,
  status: PLAYING,
  difficulty: BEGINNER,
  board: BEGINNER_BOARD,
  score: 0,
  time: 0,
};

export const gameStatusSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    changeGameStatus: (state, action: PayloadAction<{ status: GameStatus }>) => {
      state.status = action.payload.status;
    },
    changeGameDifficulty: (state, action: PayloadAction<{ difficulty: DifficultyBoard }>) => {
      const { difficulty, board } = action.payload.difficulty;
      state.difficulty = difficulty;
      state.board = board;
    },
  },
});

export const { changeGameStatus, changeGameDifficulty } = gameStatusSlice.actions;
export default gameStatusSlice.reducer;
