import { useSelector } from 'react-redux';
import { RootState } from '../state/store';
import { GameBoard } from '../style/game';
import { Blocks, gametype } from '../types/game';
import Block from './Block';

const Board = ({
  blockHandler,
  gameBoard,
  currentWidth,
}: {
  blockHandler: (isMine: boolean, row: number, col: number) => void;
  gameBoard: Blocks[][];
  currentWidth: string;
}) => {
  console.log(gameBoard);
  return (
    <GameBoard>
      {gameBoard.map((row, ridx) => {
        return (
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            {row.map((block, idx) => (
              <Block
                block={block}
                cIdx={idx}
                key={idx}
                rIdx={ridx}
                currentWidth={currentWidth}
                blockHandler={blockHandler}
              />
            ))}
          </div>
        );
      })}
    </GameBoard>
  );
};
export default Board;
