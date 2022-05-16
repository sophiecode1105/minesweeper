import { Board } from '../../types/board';
import { GameDifficulty } from '../../types/difficulty';

export function makeEmptyBoard(difficulty: GameDifficulty): Board {
  const { values } = difficulty;
  const [height, width, mines] = values;

  let newBlocks = new Array(height);
  for (let row = 0; row < height; row++) {
    for (let col = 0; col < width; col++) {
      let newBlock = {
        isMine: false,
        row: row,
        col: col,
        surroundingMines: 0,
        clicked: false,
      };
      newBlocks.push(newBlock);
    }
  }
  return {
    width,
    height,
    mines,
    minesCoordinates: [],
    blocks: newBlocks,
  };
}
