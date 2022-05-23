import { useSelector } from 'react-redux';
import Board from '../components/Board';
import Display from '../components/Display';
import OptionButton from '../components/OptionButton';
import { RootState } from '../state/store';
import { GameContainer, Container, GameBox, GameName } from '../style/game';
import { BEGINNER_BOARD, EXPERT_BOARD, INTERMEDIATE_BOARD } from '../utils/constants/board';
import { BEGINNER, EXPERT, INTERMEDIATE } from '../utils/constants/difficulty';
import { DEAD, WIN } from '../utils/constants/status';
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
import lodash from 'lodash';
import {
  calculateSurroundingMines,
  clearSurroundingNormalBlocks,
  swapMineWithNormalBlock,
} from '../utils/helper/blockHandler';

const Game = () => {
  const dispatch = useAppDispatch();
  const gameData = useSelector((state: RootState) => state.game);
  const { initialized, board, status, score, time, flags, difficulty } = gameData;
  const gameBoard = board.blocks;
  const mineBlocks = board.minesCoordinates;
  let curScore = score;

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

  const clearAllMines = () => {
    mineBlocks.forEach((coord) => {
      let [row, col] = coord;
      dispatch(changeBlocksClickedStatustoTrue({ rIdx: row, cIdx: col }));
    });
  };
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
  const blockHandler = (isMine: boolean, row: number, col: number, isRightClick: boolean) => {
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
    let { score, board } = clearSurroundingNormalBlocks(newBoard, row, col);
    let newScore = curScore + score;

    dispatch(addGameScore({ score: newScore }));
    dispatch(updateBoardContents({ board: board }));
    dispatch(changeBlocksClickedStatustoTrue({ rIdx: row, cIdx: col }));
  };

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
