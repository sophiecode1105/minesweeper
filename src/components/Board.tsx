import { GameBoard } from '../style/game';
import { BoardBlock } from '../types/game';
import Block from './Block';

const Board = ({
  gameBoard,
  blockHandler,
}: {
  gameBoard: BoardBlock[][];
  blockHandler: (isMine: boolean, row: number, col: number, isRightClick: boolean) => void;
}) => {
  return (
    <GameBoard>
      {gameBoard.map((row, ridx) => {
        return (
          <div key={`board-row-${ridx}`} style={{ display: 'flex', flexDirection: 'row' }}>
            {row.map((block, idx) => (
              <Block block={block} cIdx={idx} key={`board-block-${idx}`} rIdx={ridx} blockHandler={blockHandler} />
            ))}
          </div>
        );
      })}
    </GameBoard>
  );
};
export default Board;
