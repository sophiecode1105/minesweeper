import { fillMines, fillNormalBlocks } from '../helper/fillBlocks';
import { makeEmptyBoard } from '../helper/makeEmptyBoard';
import { BEGINNER, INTERMEDIATE, EXPERT, MINI } from './difficulty';

export const MINI_TEST_BOARD = makeEmptyBoard(MINI);
export const EMPTY_BEGINNER_BOARD = makeEmptyBoard(BEGINNER);
export const EMPTY_INTERMEDIATE_BOARD = makeEmptyBoard(INTERMEDIATE);
export const EMPTY_EXPERT_BOARD = makeEmptyBoard(EXPERT);

//빈보드를 만드는 함수 실행 -> 지뢰를 채우는 함수 실행 -> 나머지 숫자를 채우는 작업을 하는 함수 실행
export const MINI_BOARD = fillNormalBlocks(fillMines(makeEmptyBoard(MINI)));
export const BEGINNER_BOARD = fillNormalBlocks(fillMines(makeEmptyBoard(BEGINNER)));
export const INTERMEDIATE_BOARD = fillNormalBlocks(fillMines(makeEmptyBoard(INTERMEDIATE)));
export const EXPERT_BOARD = fillNormalBlocks(fillMines(makeEmptyBoard(EXPERT)));
