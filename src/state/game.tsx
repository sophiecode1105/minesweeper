import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DifficultyBoard, GameStatus, gametype } from '../types/game';
import { BEGINNER_BOARD, EMPTY_BEGINNER_BOARD, EXPERT_BOARD, INTERMEDIATE_BOARD } from '../utils/constants/board';
import { BEGINNER } from '../utils/constants/difficulty';
import { PLAYING } from '../utils/constants/status';

const initialState: gametype = {
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
      const { status } = action.payload;
      state.status = status;
    },
    changeGameDifficulty: (state, action: PayloadAction<{ difficulty: DifficultyBoard }>) => {
      const { difficulty, board } = action.payload.difficulty;
      state.difficulty = difficulty;
      state.board = board;
    },
    changeBlocksClickedStatustoTrue: (
      state,
      action: PayloadAction<{ clickStatus: boolean; rIdx: number; cIdx: number }>
    ) => {
      const { clickStatus, rIdx, cIdx } = action.payload;
      state.board.blocks[rIdx][cIdx].clicked = clickStatus;
    },
  },
});

export const { changeGameStatus, changeGameDifficulty, changeBlocksClickedStatustoTrue } = gameStatusSlice.actions;
export default gameStatusSlice.reducer;
