import { useSelector } from 'react-redux';
import lodash from 'lodash';
import Board from '../components/Board';
import Display from '../components/Display';
import OptionButton from '../components/OptionButton';
import { RootState } from '../state/store';
import { GameContainer, ButtonWrap, Container, GameBox, GameName } from '../style/game';
import { BoardBlock, MineCoordinates } from '../types/game';
import { BEGINNER_BOARD, EXPERT_BOARD, INTERMEDIATE_BOARD } from '../utils/constants/board';
import { BEGINNER, EXPERT, INTERMEDIATE } from '../utils/constants/difficulty';
import { DEAD, WIN } from '../utils/constants/status';
import { countSurroundingMines } from '../utils/helper/fillBlocks';
import {
  addGameScore,
  changeBlocksClickedStatustoTrue,
  changeGameStatus,
  changeInitializedStatus,
  increasingByOneSecond,
  toggleFlag,
  updateBoardContents,
  updateMinesCoordinatese,
} from '../state/game';
import { useAppDispatch } from '../state/hook';
import { useEffect } from 'react';
import { click } from '@testing-library/user-event/dist/click';

const Game = () => {
  const dispatch = useAppDispatch();
  const gameData = useSelector((state: RootState) => state.game);
  const { initialized, board, status, score, time, flags, difficulty } = gameData;
  const gameBoard = board.blocks;
  const mineBlocks = board.minesCoordinates;

  useEffect(() => {
    const [height, width, mines] = difficulty.values;

    if (score === height * width - mines && flags === 0) {
      dispatch(changeGameStatus({ status: WIN }));
    }
  }, [score, flags]);

  useEffect(() => {
    if (!initialized) {
      return;
    }
    if (status.status === 'playing') {
      setTimeout(() => {
        dispatch(increasingByOneSecond());
      }, 1000);
    }
  }, [time, initialized]);

  const difficulties = [
    { difficulty: BEGINNER, board: BEGINNER_BOARD },
    { difficulty: INTERMEDIATE, board: INTERMEDIATE_BOARD },
    { difficulty: EXPERT, board: EXPERT_BOARD },
  ];

  /* 블록 클릭을 핸들링해주는 함수
  // 클릭이 우측 클릭일시 깃발을 토글해준다
  // 좌측클릭일시:
  // - 첫 클릭일때:
  // -- 지뢰면 => 지뢰 아닌 블록과 swap 후 보드를 다시 계산한다
  // -- 지뢰뢰 아니면 => 게임 시작 + 점수 추가 + 확장 알고리즘 실행 + 클릭여부 변경 (true)
  // - 첫 클릭 아닐때:
  // -- 지뢰면 => 게임 오버 + 숨어 있는 지뢰 보여주기
  // -- 지뢰 아니면 => 게임 시작 + 점수 추가 + 확장 알고리즈 실행 + 클릭여부 변경 (true)
  */
  function blockHandler(isMine: boolean, row: number, col: number, isRightClick: boolean) {
    if (isRightClick) {
      dispatch(toggleFlag({ rIdx: row, cIdx: col }));
      return;
    }

    let newBoard = lodash.cloneDeep(gameBoard);
    if (!initialized) {
      if (isMine) {
        let [newRow, newCol] = swapMineWithNormalBlock(newBoard, row, col) as number[]; //지뢰시 다시 랜더링.
        newBoard = calculateSurroundingMines(newBoard); //재계산
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
        return;
      }
    }
    let newScore = score + clearSurroundingNormalBlocks(newBoard, row, col);
    dispatch(addGameScore({ score: newScore }));
    dispatch(changeBlocksClickedStatustoTrue({ rIdx: row, cIdx: col }));
  }

  //첫번째 클릭 지뢰시 지뢰를 지뢰가 아닌 것으로 바꿔주는 함수
  function swapMineWithNormalBlock(gameBoard: BoardBlock[][], mineRow: number, mineCol: number) {
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
  function calculateSurroundingMines(gameBoard: BoardBlock[][]): BoardBlock[][] {
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

  // 보드에 있는 모든 지뢰를 보여주는 함수
  //  minBlocks를 돌면서 클릭 상태를 true 로 변경;
  function clearAllMines() {
    mineBlocks.forEach((coord) => {
      let [row, col] = coord;
      dispatch(changeBlocksClickedStatustoTrue({ rIdx: row, cIdx: col }));
    });
  }

  // 클릭된 블로 기준으로 확장 가능한 블록 모두 클릭해주는 함수
  // 확장 가능함의 여부는 아래와 같다:
  // - 주변 지뢰가 0일시 => 클릭 + 주변에 지뢰 아닌 블록 검사 리스트에 추가
  // - 주변 지뢰가 0보다 클시 => 클릭
  // - 지뢰일시 => 해당사항 없음
  function clearSurroundingNormalBlocks(board: BoardBlock[][], row: number, col: number) {
    board = lodash.cloneDeep(board);
    type BlockCoordinates = [number, number];
    let score = 0;
    let surroundingCheckBlocks: BlockCoordinates[] = [[row, col]];

    const getSurroundingCoords = (board: BoardBlock[][], row: number, col: number) => {
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

      if (!currBlock) {
        continue;
      }
      board[row][col].clicked = true;

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
          <Display flags={flags} time={time} status={status} />
          <Board gameBoard={gameBoard} blockHandler={blockHandler} />
        </GameBox>
      </GameContainer>
      <OptionButton difficulties={difficulties} />
    </Container>
  );
};
export default Game;
