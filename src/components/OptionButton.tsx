import { changeGameDifficulty } from '../state/game';
import { useAppDispatch } from '../state/hook';
import { Button, ButtonWrap } from '../style/game';
import { DifficultyBoard, GameStatus } from '../types/game';
const OptionButton = ({ difficulties }: { difficulties: DifficultyBoard[] }) => {
  const dispatch = useAppDispatch();

  const changeGameLevel = (difficulty: DifficultyBoard) => {
    dispatch(changeGameDifficulty({ difficulty }));
  };

  return (
    <ButtonWrap>
      {difficulties.map((difficulty, idx) => {
        return (
          <Button
            onClick={() => {
              changeGameLevel(difficulty);
            }}
            key={`difficulty-butto-${idx}`}
          >
            {difficulty.difficulty.name}
          </Button>
        );
      })}
    </ButtonWrap>
  );
};

export default OptionButton;
