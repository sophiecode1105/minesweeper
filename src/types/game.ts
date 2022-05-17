export interface gametype {
  initialized: boolean;
  status: GameStatus;
  difficulty: GameDifficulty;
  board: Board;
  score: number;
  time: number;
}

export interface GameDifficulty {
  name: string;
  values: number[];
  width: string;
}

export interface DifficultyBoard {
  difficulty: GameDifficulty;
  board: Board;
}

export interface Board {
  width: number;
  height: number;
  mines: number;
  minesCoordinates: MineCoordinates[];
  blocks: Blocks[][];
}

export type MineCoordinates = number[];

export interface Blocks {
  isMine: boolean;
  row: number;
  col: number;
  surroundingMines: number;
  clicked: boolean;
}

export interface GameStatus {
  status: string;
  img: string;
}
