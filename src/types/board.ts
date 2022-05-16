export interface Board {
  width: number;
  height: number;
  mines: number;
  minesCoordinates: MineCoordinates[];
  blocks: Blocks[][];
}

export type MineCoordinates = [number, number];

export interface Blocks {
  isMine: boolean;
  row: number;
  col: number;
  surroundingMines: number;
  clicked: boolean;
}
