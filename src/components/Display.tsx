import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { resetGame } from '../state/game';
import { ControlBox, CountBox, ResetButton, TimerBox } from '../style/game';
import { GameStatus } from '../types/game';

const Display = ({ time, flags, status }: { time: number; flags: number; status: GameStatus }) => {
  // useEffect(() => {}, [time]);
  const dispatch = useDispatch();
  type CountBoxArr = [string, string, string];

  const numToStringArr = (time: number): CountBoxArr => {
    let strArr = (time % 1000).toString().split('');
    while (strArr.length < 3) {
      strArr.unshift('0');
    }
    return strArr as CountBoxArr;
  };

  return (
    <ControlBox>
      <CountBox>
        {numToStringArr(flags).map((el, idx) => (
          <span key={`flagBox-${idx}`}>{el}</span>
        ))}
      </CountBox>
      <ResetButton imgURL={status.img} onClick={() => dispatch(resetGame())} />
      <TimerBox>
        {numToStringArr(time).map((el, idx) => (
          <span key={`timeBox-${idx}`}>{el}</span>
        ))}
      </TimerBox>
    </ControlBox>
  );
};

export default Display;
