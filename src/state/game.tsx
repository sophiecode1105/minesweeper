import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Blocks, DifficultyBoard, GameStatus, gametype, MineCoordinates } from '../types/game';
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
    updateMinesCoordinatese: (state, action: PayloadAction<{ newMineBlocks: MineCoordinates[] }>) => {
      const { newMineBlocks } = action.payload;
      state.board.minesCoordinates = newMineBlocks;
    },
    changeInitializedStatus: (state, action: PayloadAction<{ status: boolean }>) => {
      const { status } = action.payload;
      state.initialized = status;
    },
    addGameScore: (state, action: PayloadAction<{ score: number }>) => {
      const { score } = action.payload;
      state.score = score;
    },
    updateBoardContents: (state, action: PayloadAction<{ board: Blocks[][] }>) => {
      console.log('실행');
      const { board } = action.payload;
      state.board.blocks = board;
    },
  },
});

export const {
  changeGameStatus,
  changeGameDifficulty,
  changeBlocksClickedStatustoTrue,
  updateMinesCoordinatese,
  changeInitializedStatus,
  addGameScore,
  updateBoardContents,
} = gameStatusSlice.actions;
export default gameStatusSlice.reducer;
