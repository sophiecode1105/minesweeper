import { ControlBox, CountBox, ResetButton, TimerBox } from '../style/game';

const Display = () => {
  return (
    <ControlBox>
      <CountBox>
        <span>0</span>
        <span>9</span>
        <span>0</span>
      </CountBox>
      <ResetButton></ResetButton>
      <TimerBox>
        <span>0</span>
        <span>0</span>
        <span>0</span>
      </TimerBox>
    </ControlBox>
  );
};

export default Display;
