import { useSelector } from 'react-redux';

import Board from '../components/Board';
import Display from '../components/Display';
import OptionButton from '../components/OptionButton';

import { RootState } from '../state/store';
import { GameContainer, ButtonWrap, Container, GameBox, GameName } from '../style/game';
import { BEGINNER_BOARD, EXPERT_BOARD, INTERMEDIATE_BOARD } from '../utils/constants/board';
import { BEGINNER, EXPERT, INTERMEDIATE } from '../utils/constants/difficulty';

const Game = () => {
  const gameData = useSelector((state: RootState) => state.game);
  const { initialized, board, status, difficulty, score, time } = gameData;

  console.log('뭐꼬', gameData);

  const difficulties = [
    {
      difficulty: BEGINNER,
      board: BEGINNER_BOARD,
    },
    { difficulty: INTERMEDIATE, board: INTERMEDIATE_BOARD },
    { difficulty: EXPERT, board: EXPERT_BOARD },
  ];

  return (
    <Container>
      <GameName>Minesweeper</GameName>
      <GameContainer>
        <GameBox>
          <Display />
          <Board gameBoard={board.blocks} currentWidth={difficulty.width} />
        </GameBox>
      </GameContainer>
      <OptionButton difficulties={difficulties} />
    </Container>
  );
};
export default Game;
