import { getCurrentScope } from 'immer/dist/internal';
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../state/store';
import { GameBlock } from '../style/game';
import { BoardBlock } from '../types/game';

const Block = ({
  block: { isMine, row, col, surroundingMines, clicked, flagged },
  blockHandler,
}: {
  block: BoardBlock;
  blockHandler: (isMine: boolean, row: number, col: number, isRightClick: boolean) => void;
  rIdx: number;
  cIdx: number;
}) => {
  const clickedBackgroundColor = '#f6f6f6d6';
  const palette = {
    0: '#f2e2e222',
    1: 'blue',
    2: 'green',
    3: 'red',
    4: 'navy',
    5: 'yellow',
    6: 'brown',
    7: 'violet',
    8: 'orange',
  };
  const getColor = (surroundingMines: number): string => {
    return palette[surroundingMines as keyof typeof palette];
  };
  const playable = useSelector((state: RootState) => state.game.status.status === 'playing');
  // 블록에 대한 클릭 이벤트 핸들러
  // 클릭시 지뢰 + 일반 블록 으로 채워지는 함수.
  const clickHandler = () => {
    //게임종료시에는 작동이 안되는 로직
    if (!playable) {
      return;
    }
    blockHandler(isMine, row, col, false);
    // dispatch(changeBlocksClickedStatustoTrue({ rIdx, cIdx }));
  };

  const rightClickHandler = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!playable) {
      return;
    }
    blockHandler(isMine, row, col, true);
  };

  if (flagged) {
    return (
      <GameBlock backgroundImg={'assets/flag.png'} onContextMenu={(e) => rightClickHandler(e)}>
        {' '}
      </GameBlock>
    );
  }
  if (!clicked) {
    return <GameBlock onContextMenu={(e) => rightClickHandler(e)} onClick={clickHandler} />;
  }
  if (isMine) {
    return (
      <GameBlock backgroundImg={'assets/bomb.png'} backgroundColor={'red'} onClick={clickHandler}>
        {' '}
      </GameBlock>
    );
  }
  return (
    <GameBlock backgroundColor={clickedBackgroundColor} fontColor={getColor(surroundingMines)}>
      {surroundingMines ? surroundingMines : ''}
    </GameBlock>
  );
};
export default Block;
