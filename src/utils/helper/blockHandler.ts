import { updateBoardContents } from '../../state/game';
import { BlockCoordinates, BoardBlock } from '../../types/game';
import { countSurroundingMines } from './fillBlocks';
import lodash from 'lodash';

//첫번째 클릭 지뢰시 지뢰를 지뢰가 아닌 것으로 바꿔주는 함수
export const swapMineWithNormalBlock = (gameBoard: BoardBlock[][], mineRow: number, mineCol: number) => {
  let board = gameBoard;
  for (let row = 0; row < board.length; row++) {
    for (let col = 0; col < board[row].length; col++) {
      if (!board[row][col].isMine) {
        [board[row][col], board[mineRow][mineCol]] = [board[mineRow][mineCol], board[row][col]];
        return [row, col];
      }
    }
  }
};

//재계산을 도와 주는 함수
export const calculateSurroundingMines = (gameBoard: BoardBlock[][]): BoardBlock[][] => {
  let board = gameBoard;
  for (let row = 0; row < board.length; row++) {
    for (let col = 0; col < board[row].length; col++) {
      const currBlock = board[row][col];
      // 주변 지뢰를 카운트 한 후 사용가능한(비어있는) 모든 블록을 일반 블록으로 채운다.
      let sm = countSurroundingMines(board, row, col);
      currBlock.row = row;
      currBlock.col = col;
      currBlock.surroundingMines = sm;
    }
  }
  return board;
};

// 보드에 있는 모든 지뢰를 보여주는 함수
//  minBlocks를 돌면서 클릭 상태를 true 로 변경;

export const getSurroundingCoords = (board: BoardBlock[][], row: number, col: number) => {
  let leftBound = col - 1 < 0 ? undefined : col - 1;
  let rightBound = col + 1 > board[row]?.length - 1 ? undefined : col + 1;
  let upBound = row - 1 < 0 ? undefined : row - 1;
  let downBound = row + 1 > board?.length - 1 ? undefined : row + 1;

  // block(board[row][col])의 주변 8개
  const surroundingCoords = [
    [row, leftBound],
    [upBound, leftBound],
    [upBound, col],
    [upBound, rightBound],
    [row, rightBound],
    [downBound, rightBound],
    [downBound, col],
    [downBound, leftBound],
  ];
  return surroundingCoords;
};

export const clearSurroundingNormalBlocks = (board: BoardBlock[][], row: number, col: number) => {
  board = lodash.cloneDeep(board);
  let score = 0;
  let surroundingCheckBlocks: BlockCoordinates[] = [[row, col]];

  while (surroundingCheckBlocks.length) {
    let [row, col] = surroundingCheckBlocks.shift() as BlockCoordinates;
    let currBlock = board[row][col];
    if (currBlock.isMine || currBlock.clicked) {
      continue;
    }

    if (!currBlock) {
      continue;
    }
    board[row][col].clicked = true;

    score++;
    if (currBlock.surroundingMines > 0) {
      continue;
    }

    let coordsList = getSurroundingCoords(board, row, col);
    //주변 바운더리를 다 체크했다면 surroundingBlocks list 추가
    coordsList.forEach((coord) => {
      let [checkRow, checkCol] = coord;
      if (checkRow !== undefined && checkCol !== undefined) {
        let surrBlock = board[checkRow][checkCol];
        if (!surrBlock.isMine && !surrBlock.clicked) {
          surroundingCheckBlocks.push([surrBlock.row, surrBlock.col]);
        }
      }
    });
  }

  return { score, board };
};
