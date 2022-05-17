import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { BoardBlock, DifficultyBoard, GameStatus, Game, MineCoordinates } from '../types/game';
import { BEGINNER_BOARD } from '../utils/constants/board';
import { BEGINNER } from '../utils/constants/difficulty';
import { PLAYING } from '../utils/constants/status';
import { fillMines, fillNormalBlocks } from '../utils/helper/fillBlocks';
import { makeEmptyBoard } from '../utils/helper/makeEmptyBoard';

const initialState: Game = {
  initialized: false,
  status: PLAYING,
  difficulty: BEGINNER,
  board: BEGINNER_BOARD,
  score: 0,
  time: 0,
  flags: 10,
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
      const { difficulty } = action.payload.difficulty;
      return {
        initialized: false,
        status: PLAYING,
        difficulty,
        board: fillNormalBlocks(fillMines(makeEmptyBoard(difficulty))),
        score: 0,
        time: 0,
        flags: difficulty.flags,
      };
    },
    changeBlocksClickedStatustoTrue: (state, action: PayloadAction<{ rIdx: number; cIdx: number }>) => {
      const { rIdx, cIdx } = action.payload;
      let isClicked = state.board.blocks[rIdx][cIdx].clicked;
      if (isClicked) return;
      state.board.blocks[rIdx][cIdx].clicked = true;
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
    updateBoardContents: (state, action: PayloadAction<{ board: BoardBlock[][] }>) => {
      const { board } = action.payload;
      state.board.blocks = board;
    },
    increasingByOneSecond: (state) => {
      state.time++;
    },
    resetGame: (state) => {
      return {
        initialized: false,
        status: PLAYING,
        difficulty: state.difficulty,
        board: fillNormalBlocks(fillMines(makeEmptyBoard(state.difficulty))),
        score: 0,
        time: 0,
        flags: state.difficulty.flags,
      };
    },
    toggleFlag: (state, action: PayloadAction<{ rIdx: number; cIdx: number }>) => {
      const { rIdx, cIdx } = action.payload;
      const isFlagged = state.board.blocks[rIdx][cIdx].flagged;
      if (isFlagged) {
        state.flags++;
      } else {
        state.flags--;
      }
      state.board.blocks[rIdx][cIdx].flagged = !state.board.blocks[rIdx][cIdx].flagged;
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
  increasingByOneSecond,
  resetGame,
  toggleFlag,
} = gameStatusSlice.actions;
export default gameStatusSlice.reducer;
