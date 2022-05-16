import { Blocks, Board, MineCoordinates } from '../../types/board';

// 보드의 mines 만킁믜 지뢰 블록을 채워주는 함수
// 생성된 지뢰들의 좌표는 Board.mineCoordinate 에 저장됨 -> 저장이유: 이후에 게임오버시 지뢰가 심어진 부분을 전체화면에 보여주기위함.
export const fillMines = (board: Board): Board => {
  let mineBlocks: MineCoordinates[] = [];
  let { blocks, mines, height, width } = board;

  // 랜덤 row,col 페어를 생성해주는 헬퍼 함수
  let generateRandomCoords = (height: number, width: number): MineCoordinates => {
    return [Math.round(Math.random() * height), Math.round(Math.random() * width)];
  };
  // 전달되는 보드의 해당 좌표에 지뢰를 심어주고, 해당 좌표를 저장해주는 헬퍼 함수
  let insertMinesInPlace = (blocks: Blocks[][], row: number, col: number) => {
    // console.log(blocks, blocks[row], blocks[row][col]);
    if (!blocks || !blocks[row] || !blocks[row][col]) {
      return;
    }
    let newMineBlock = {
      isMine: true,
      row,
      col,
      surroundingMines: 0,
      clicked: false,
    };
    newMineBlock.row = row;
    newMineBlock.col = col;
    blocks[row][col] = newMineBlock;
    mineBlocks.push([row, col]);
  };

  // 랜덤 생성된 좌표를 담는 배열
  let mineCoords: MineCoordinates[] = [];
  let loops = 0; // 무한 루프 비상 탈출을 위한 안전장치
  while (mineCoords.length < mines) {
    let newPair = generateRandomCoords(height - 1, width - 1);
    let unique = true;
    // 좌표가 중복되지 않도록 이미 mineCoords에 담겨있는지 테스트
    for (let i = 0; i < mineCoords.length; i++) {
      let [stdR, stdC] = mineCoords[i];
      let [compR, compC] = newPair;
      if (stdR === compR && stdC === compC) {
        unique = false;
        break;
      }
    }
    if (!unique) {
      continue;
    }
    mineCoords.push(newPair);
    loops++;
    if (loops >= 100000) {
      break;
    }
  }
  // 랜덤 생성된 좌표들에 실제로 블록을 주입하는 루프
  mineCoords.forEach((pair) => {
    let [r, c] = pair;
    insertMinesInPlace(blocks, r, c);
  });

  board.minesCoordinates = mineBlocks;
  return board;
};

export function fillNormalBlocks(board: Board): Board {
  let { blocks } = board;
  for (let row = 0; row < blocks.length; row++) {
    for (let col = 0; col < blocks[row].length; col++) {
      const currBlock = blocks[row][col];
      if (currBlock.isMine) {
        continue;
      }
      // 주변 지뢰 탐지 후 비어있는 블로을 노멀 블록으로 변경
      let newNormalBlock = {
        isMine: false,
        row,
        col,
        surroundingMines: 0,
        clicked: false,
      };
      let sm = countSurroundingMines(blocks, row, col);
      newNormalBlock.surroundingMines = sm;
      blocks[row][col] = newNormalBlock;
    }
  }
  return board;
}

// 한 블록의 주변 블로들이 지뢰인지 카운티 해주는 헬퍼 함수
// 최대 8개까지 카운팅
function countSurroundingMines(blocks: Blocks[][], row: number, col: number): number {
  let mines = 0;
  let leftBound = col - 1 < 0 ? undefined : col - 1;
  let rightBound = col + 1 > blocks[row].length - 1 ? undefined : col + 1;
  let upBound = row - 1 < 0 ? undefined : row - 1;
  let downBound = row + 1 > blocks.length - 1 ? undefined : row + 1;

  // board[row][col] 주변 8개 블록
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

  //주변 블록의 지뢰를 체크하기위함.
  //만약 row 나 col 이 undefined면 skip
  surroundingCoords.forEach((coord) => {
    let [checkRow, checkCol] = coord;
    if (checkRow === undefined || checkCol === undefined) {
    } else {
      if (blocks[checkRow][checkCol]?.isMine) {
        mines++;
      }
    }
  });
  return mines;
}
