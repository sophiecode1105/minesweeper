import { GameStatus } from '../../types/game';

export const PLAYING: GameStatus = {
  status: 'playing',
  img: 'img/smile.png',
};

export const DEAD: GameStatus = {
  status: 'YOU LOST',
  img: 'img/dead.png',
};

export const WIN: GameStatus = {
  status: 'YOU WON',
  img: 'img/sunglass.png',
};
