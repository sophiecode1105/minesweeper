import { GameStatus } from '../../types/game';

export const PLAYING: GameStatus = {
  status: 'playing',
  img: 'assets/smile.png',
};

export const DEAD: GameStatus = {
  status: 'YOU LOST',
  img: 'assets/dead.png',
};

export const WIN: GameStatus = {
  status: 'YOU WON',
  img: 'assets/sunglass.png',
};
