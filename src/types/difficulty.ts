import { Board } from './board';

export interface GameDifficulty {
  name: string;
  values: number[];
  width: string;
}

export interface DifficultyBoard {
  difficulty: GameDifficulty;
  board: Board;
}
