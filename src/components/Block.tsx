import { Blocks } from '../types/board';

const Block = ({ block: { isMine, row, col, surroundingMines, clicked } }: { block: Blocks }) => {
  // 블록에 대한 클릭 이벤트 핸들러
  const clickHandler = () => {
    console.log('clicked!');
    // dispatch ->
    // 얘를 지뢰 + 일반 블록 채우기
    //
  };

  // if (!clicked) {
  //   return <td onClick={clickHandler}>{'ㅁ'}</td>;
  // }

  if (isMine) {
    return <td>{'B'}</td>;
  }

  return <td>{surroundingMines}</td>;
};
export default Block;
