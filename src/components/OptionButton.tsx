import { useEffect } from 'react';
import styled from 'styled-components';
import { changeGameDifficulty } from '../state/game';
import { useAppDispatch } from '../state/hook';
import { Button, ButtonWrap } from '../style/game';
import { DifficultyBoard } from '../types/game';
const OptionButton = ({ difficulties }: { difficulties: DifficultyBoard[] }) => {
  const dispatch = useAppDispatch();

  const changeGameLevel = (difficulty: DifficultyBoard) => {
    dispatch(changeGameDifficulty({ difficulty }));
  };

  return (
    <ButtonWrap>
      {difficulties.map((difficulty) => {
        return (
          <Button
            onClick={() => {
              changeGameLevel(difficulty);
            }}
          >
            {difficulty.difficulty.name}
          </Button>
        );
      })}
    </ButtonWrap>
  );
};

export default OptionButton;
