import { changeBlocksClickedStatustoTrue } from '../state/game';
import { useAppDispatch } from '../state/hook';
import { GameBlock } from '../style/game';
import { Blocks } from '../types/game';

const Block = ({
  block: { isMine, row, col, surroundingMines, clicked },
  rIdx,
  cIdx,
  currentWidth,
}: {
  block: Blocks;
  rIdx: number;
  cIdx: number;
  currentWidth: string;
}) => {
  const dispatch = useAppDispatch();

  // 블록에 대한 클릭 이벤트 핸들러
  // 클릭시 지뢰 + 일반 블록 으로 채워지는 함수.
  const clickHandler = () => {
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
