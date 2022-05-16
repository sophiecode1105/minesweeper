import { Board } from '../../types/board';
import { GameDifficulty } from '../../types/difficulty';

//보드를 생성해주고 빈값이 들어있는 블록을 만드는 함수.
export function makeEmptyBoard(difficulty: GameDifficulty): Board {
  const { values } = difficulty;
  const [height, width, mines] = values;

  let newBlocks = new Array(height);
  for (let row = 0; row < height; row++) {
    let rowArr = new Array(width);
    for (let col = 0; col < width; col++) {
      let newBlock = {
        isMine: false,
        row: row,
        col: col,
        surroundingMines: 0,
        clicked: false,
      };
      rowArr[col] = newBlock;
    }
    newBlocks[row] = rowArr;
  }
  return {
    width,
    height,
    mines,
    minesCoordinates: [],
    blocks: newBlocks,
  };
}
