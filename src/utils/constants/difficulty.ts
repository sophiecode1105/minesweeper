import { GameDifficulty } from '../../types/game';

export const BEGINNER: GameDifficulty = {
  name: 'Beginner',
  values: [9, 9, 10],
  width: '11.1112%',
};

export const INTERMEDIATE: GameDifficulty = {
  name: 'Intermediate',
  values: [16, 16, 40],
  width: '6.25%',
};

export const EXPERT: GameDifficulty = {
  name: 'Expert',
  values: [16, 30, 99],
  width: '3.3334%',
};
