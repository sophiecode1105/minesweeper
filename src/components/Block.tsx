import { useSelector } from 'react-redux';
import { changeBlocksClickedStatustoTrue } from '../state/game';
import { useAppDispatch } from '../state/hook';
import { RootState } from '../state/store';
import { GameBlock } from '../style/game';
import { Blocks } from '../types/game';

const Block = ({
  block: { isMine, row, col, surroundingMines, clicked },
  blockHandler,
  rIdx,
  cIdx,
  currentWidth,
}: {
  block: Blocks;
  blockHandler: (isMine: boolean, row: number, col: number) => void;
  rIdx: number;
  cIdx: number;
  currentWidth: string;
}) => {
  const dispatch = useAppDispatch();
  const playable = useSelector((state: RootState) => state.game.status.status === 'playing');

  // 블록에 대한 클릭 이벤트 핸들러
  // 클릭시 지뢰 + 일반 블록 으로 채워지는 함수.
  const clickHandler = () => {
    //게임종료시에는 작동이 안되는 로직
    if (!playable) {
      return;
    }
    blockHandler(isMine, row, col);
    dispatch(changeBlocksClickedStatustoTrue({ clickStatus: true, rIdx, cIdx }));
  };

  if (!clicked) {
    return (
      <GameBlock currentWidth={currentWidth} onClick={clickHandler}>
        .
      </GameBlock>
    );
  }

  if (isMine) {
    return (
      <GameBlock currentWidth={currentWidth} onClick={clickHandler}>
        B
      </GameBlock>
    );
  }

  return <GameBlock currentWidth={currentWidth}>{surroundingMines}</GameBlock>;
};
export default Block;
