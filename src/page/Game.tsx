import { useSelector } from 'react-redux';
import lodash from 'lodash';
import Board from '../components/Board';
import Display from '../components/Display';
import OptionButton from '../components/OptionButton';
import { RootState } from '../state/store';
import { GameContainer, ButtonWrap, Container, GameBox, GameName } from '../style/game';
import { Blocks } from '../types/game';
import { BEGINNER_BOARD, EXPERT_BOARD, INTERMEDIATE_BOARD } from '../utils/constants/board';
import { BEGINNER, EXPERT, INTERMEDIATE } from '../utils/constants/difficulty';
import { DEAD } from '../utils/constants/status';
import { countSurroundingMines } from '../utils/helper/fillBlocks';
import game, {
  addGameScore,
  changeBlocksClickedStatustoTrue,
  changeGameStatus,
  changeInitializedStatus,
  updateBoardContents,
  updateMinesCoordinatese,
} from '../state/game';
import { useAppDispatch } from '../state/hook';

const Game = () => {
  const dispatch = useAppDispatch();

  const gameData = useSelector((state: RootState) => state.game);
  const { initialized, board, status, difficulty, score, time } = gameData;
  const gameBoard = board.blocks;
  const mineBlocks = board.minesCoordinates;

  const difficulties = [
    { difficulty: BEGINNER, board: BEGINNER_BOARD },
    { difficulty: INTERMEDIATE, board: INTERMEDIATE_BOARD },
    { difficulty: EXPERT, board: EXPERT_BOARD },
  ];

  function blockHandler(isMine: boolean, row: number, col: number) {
    let newBoard = lodash.cloneDeep(gameBoard);
    if (!initialized) {
      if (isMine) {
        let [newRow, newCol] = swapMineWithNormalBlock(newBoard, row, col) as number[]; //지뢰시 다시 랜더링.
        newBoard = calculateSurroundingMinesInPlace(newBoard); //재계산
        dispatch(updateBoardContents({ board: newBoard }));

        let newMineBlocks = mineBlocks.map((coord) => {
          let [r, c] = coord;
          if (r === row && c === col) {
            return [newRow, newCol];
          } else {
            return coord;
          }
        });
        dispatch(updateMinesCoordinatese({ newMineBlocks }));
      }
      dispatch(changeInitializedStatus({ status: true }));
    } else {
      if (isMine) {
        dispatch(changeGameStatus({ status: DEAD }));
        clearAllMines();
      }
    }
    let newScore = score + clearSurroundingNormalBlocks(newBoard, row, col);
    dispatch(addGameScore({ score: newScore }));

    dispatch(changeBlocksClickedStatustoTrue({ clickStatus: true, rIdx: row, cIdx: col }));
  }

  //첫번째 클릭 지뢰시 지뢰를 지뢰가 아닌 것으로 바꿔주는 함수
  function swapMineWithNormalBlock(gameBoard: Blocks[][], mineRow: number, mineCol: number) {
    let board = gameBoard;
    for (let row = 0; row < board.length; row++) {
      for (let col = 0; col < board[row].length; col++) {
        if (!board[row][col].isMine) {
          [board[row][col], board[mineRow][mineCol]] = [board[mineRow][mineCol], board[row][col]];
          return [row, col];
        }
      }
    }
  }

  //재계산을 도와 주는 함수
  function calculateSurroundingMinesInPlace(gameBoard: Blocks[][]): Blocks[][] {
    let board = gameBoard;
    for (let row = 0; row < board.length; row++) {
      for (let col = 0; col < board[row].length; col++) {
        const currBlock = board[row][col];

        // 주변 지뢰를 카운트 한 후 사용가능한(비어있는) 모든 블록을 일반 블록으로 채운다.
        let sm = countSurroundingMines(board, row, col);
        currBlock.row = row;
        currBlock.col = col;
        currBlock.surroundingMines = sm;
      }
    }
    return board;
  }

  function clearAllMines() {
    mineBlocks.forEach((coord) => {
      let [row, col] = coord;
      dispatch(changeBlocksClickedStatustoTrue({ clickStatus: true, rIdx: row, cIdx: col }));
    });
  }

  function clearSurroundingNormalBlocks(board: Blocks[][], row: number, col: number) {
    type BlockCoordinates = [number, number];
    let score = 0;
    let surroundingCheckBlocks: BlockCoordinates[] = [[row, col]];

    const getSurroundingCoords = (board: Blocks[][], row: number, col: number) => {
      let leftBound = col - 1 < 0 ? undefined : col - 1;
      let rightBound = col + 1 > board[row]?.length - 1 ? undefined : col + 1;
      let upBound = row - 1 < 0 ? undefined : row - 1;
      let downBound = row + 1 > board?.length - 1 ? undefined : row + 1;

      // block(board[row][col])의 주변 8개
      const surroundingCoords = [
        [row, leftBound],
        [upBound, leftBound],
        [upBound, col],
        [upBound, rightBound],
        [row, rightBound],
        [downBound, rightBound],
        [downBound, col],
        [downBound, leftBound],
      ];
      return surroundingCoords;
    };

    while (surroundingCheckBlocks.length) {
      let [row, col] = surroundingCheckBlocks.shift() as BlockCoordinates;
      let currBlock = board[row][col];
      if (currBlock.isMine || currBlock.clicked) {
        continue;
      }

      currBlock.clicked = true;
      score++;
      if (currBlock.surroundingMines > 0) {
        continue;
      }

      let coordsList = getSurroundingCoords(board, row, col);
      //주변 바운더리를 다 체크했다면 surroundingBlocks list 추가
      coordsList.forEach((coord) => {
        let [checkRow, checkCol] = coord;
        if (checkRow !== undefined && checkCol !== undefined) {
          let surrBlock = board[checkRow][checkCol];
          if (!surrBlock.isMine && !surrBlock.clicked) {
            surroundingCheckBlocks.push([surrBlock.row, surrBlock.col]);
          }
        }
      });
    }

    dispatch(updateBoardContents({ board: board }));
    return score;
  }

  return (
    <Container>
      <GameName>Minesweeper</GameName>
      <GameContainer>
        <GameBox>
          <Display />
          <Board gameBoard={gameBoard} currentWidth={difficulty.width} blockHandler={blockHandler} />
        </GameBox>
      </GameContainer>
      <OptionButton difficulties={difficulties} />
    </Container>
  );
};
export default Game;
