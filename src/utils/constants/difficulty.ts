import { GameDifficulty } from '../../types/difficulty';

export const BEGINNER: GameDifficulty = {
  name: 'beginner',
  values: [9, 9, 10],
  width: '266px',
};

export const INTERMEDIATE: GameDifficulty = {
  name: 'intermediate',
  values: [16, 16, 40],
  width: '455px',
};

export const EXPERT: GameDifficulty = {
  name: 'expert',
  values: [30, 16, 99],
  width: '810px',
};
