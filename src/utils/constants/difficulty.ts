import { GameDifficulty } from '../../types/game';

export const MINI: GameDifficulty = {
  name: 'Beginner',
  values: [2, 2, 1],
  flags: 1,
};

export const BEGINNER: GameDifficulty = {
  name: 'Beginner',
  values: [9, 9, 10],
  flags: 10,
};

export const INTERMEDIATE: GameDifficulty = {
  name: 'Intermediate',
  values: [16, 16, 40],
  flags: 40,
};

export const EXPERT: GameDifficulty = {
  name: 'Expert',
  values: [16, 30, 99],
  flags: 99,
};
