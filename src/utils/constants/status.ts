import { GameStatus } from '../../types/game';

export const PLAYING: GameStatus = {
  status: 'playing',
  img: 'img/smile.png',
};

export const DEAD: GameStatus = {
  status: 'dead',
  img: 'img/dead.png',
};

export const WIN: GameStatus = {
  status: 'win',
  img: 'img/sunglass.png',
};
