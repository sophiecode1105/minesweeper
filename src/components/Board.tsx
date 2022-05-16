import { useSelector } from 'react-redux';
import { RootState } from '../state/store';
import { GameBoard } from '../style/game';
import Block from './Block';

const Board = () => {
  const gameBoard = useSelector((state: RootState) => state.game.board.blocks);

  console.log('gameBoard', gameBoard);

  return (
    <GameBoard>
      <tbody>
        {gameBoard.map((row) => {
          console.log('row', row);
          return (
            <tr>
              {row.map((block) => (
                <Block block={block} />
              ))}
            </tr>
          );
        })}
      </tbody>
    </GameBoard>
  );
};
export default Board;
