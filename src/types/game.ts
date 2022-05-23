export interface Game {
  initialized: boolean;
  status: GameStatus;
  difficulty: GameDifficulty;
  board: Board;
  score: number;
  time: number;
  flags: number;
}

export interface GameDifficulty {
  name: string;
  values: number[];
  flags: number;
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
  blocks: BoardBlock[][];
}

export type MineCoordinates = number[];

export type BlockCoordinates = [number, number];

export interface BoardBlock {
  isMine: boolean;
  row: number;
  col: number;
  surroundingMines: number;
  clicked: boolean;
  flagged: boolean;
}

export interface GameStatus {
  status: string;
  img: string;
}
