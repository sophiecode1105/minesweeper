import { useEffect } from 'react';
import styled from 'styled-components';
import { changeGameDifficulty } from '../state/game';
import { useAppDispatch } from '../state/hook';
import { Button } from '../style/game';
import { Board } from '../types/board';
import { DifficultyBoard, GameDifficulty } from '../types/difficulty';

const OptionButton = ({ difficulty }: { difficulty: DifficultyBoard }) => {
  const dispatch = useAppDispatch();

  console.log('디피컬티', difficulty);
  const changeGameLevel = (difficulty: DifficultyBoard) => {
    dispatch(changeGameDifficulty({ difficulty }));
  };

  return (
    <Button
      onClick={() => {
        changeGameLevel(difficulty);
      }}
    >
      {difficulty.difficulty.name}
    </Button>
  );
};

export default OptionButton;
