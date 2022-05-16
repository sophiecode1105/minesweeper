import { useEffect, useState } from 'react';
import styled from 'styled-components';
import smile from '../assets/smile.png';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
`;

const GameName = styled.h1`
  text-align: center;
  color: rgb(255, 202, 76);
  margin: 100px 0px 50px 0px;
  font-size: 25px;
`;

interface widthProp {
  currentWidth: string;
}

const BoardContainer = styled.div<widthProp>`
  color: #fff;
  border: 2px solid white;
  margin: 20px auto 50px auto;
  width: ${(props) => props.currentWidth};
`;

const GameBox = styled.div`
  width: 100%;
  padding: 7px 0;
  background: #d1d1d1;
  border: 3px solid #888;
  border-top-color: #f6f6f6;
  border-left-color: #f6f6f6;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ControlBox = styled.div`
  display: table;
  height: 35px;
  padding: 0 8px;
  box-sizing: border-box;
  width: calc(100% - 15px);
  margin: auto;
  border: 3px solid #888;
  border-right-color: #f6f6f6;
  border-bottom-color: #f6f6f6;

  > * {
    display: table-cell;
    vertical-align: middle;
  }
`;

const CountBox = styled.div`
  width: 60px;
  font-size: 0;

  > span {
    display: inline-block;
    box-sizing: border-box;
    width: 20px;
    padding-top: 2px;
    color: #ff0000;
    font-size: 25px;
    border-right: 1px solid #ddd;
    background: #222;
    &:last-child {
      border-right: 0;
    }
  }
`;

const TimerBox = styled(CountBox)``;

const ResetButton = styled.button`
  width: 35px;
  height: 35px;
  background: url('img/smile.png') no-repeat center / 90%;
  border: 3px solid #666;
  border-top-color: #f6f6f6;
  border-left-color: #f6f6f6;

  cursor: pointer;
  &:active {
    border: 3px solid #666;
    border-bottom-color: #f6f6f6;
    border-right-color: #f6f6f6;
    background: url('img/curious.png') no-repeat center / 90%;
  }
`;

const GameBoard = styled.table`
  width: calc(100% - 15px);
  margin: auto;
  border: 3px solid #888;
  border-right-color: #f6f6f6;
  border-bottom-color: #f6f6f6;
  margin-top: 7px;
  padding: 0;
  list-style: none;
  border-spacing: 0;
`;

const Button = styled.button`
  width: auto;
  background: #a158ff;
  border: 3px solid #4c2a9c;
  border-top-color: #c8b2ff;
  border-left-color: #c8b2ff;
  font-family: 'Press Start 2P', cursive;
  color: #fff;
  font-size: 15px;
  padding: 5px;
  margin: 5px;
  cursor: pointer;
`;
const ButtonWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Main = () => {
  const levels = ['Biginner', 'Intermediate', 'Expert'];
  const [currentWidth, setCurrentWidth] = useState<string>('266px');
  const [currentLevel, setCurrentLevel] = useState<string>('beginner');
  const [status, setStatus] = useState<string>('img/smile.png');

  useEffect(() => {
    if (currentLevel === 'Biginner') {
      setCurrentWidth('266px');
    } else if (currentLevel === 'Intermediate') {
      setCurrentWidth('455px');
    } else {
      setCurrentWidth('810px');
    }
  }, [currentLevel]);

  const changeGanmeLevel = (level: string) => {
    setCurrentLevel(level);
  };

  return (
    <Container>
      <GameName>Minesweeper</GameName>
      <BoardContainer currentWidth={currentWidth}>
        <GameBox>
          <ControlBox>
            <CountBox>
              <span>0</span>
              <span>1</span>
              <span>0</span>
            </CountBox>
            <ResetButton></ResetButton>
            <TimerBox>
              <span>0</span>
              <span>0</span>
              <span>0</span>
            </TimerBox>
          </ControlBox>
          <GameBoard>
            <tbody></tbody>
          </GameBoard>
        </GameBox>
      </BoardContainer>
      <ButtonWrap>
        {levels.map((level) => {
          return (
            <Button
              onClick={() => {
                changeGanmeLevel(level);
              }}
            >
              {level}
            </Button>
          );
        })}
      </ButtonWrap>
    </Container>
  );
};
export default Main;
