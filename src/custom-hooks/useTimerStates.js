import { useState } from 'react'

const useTimerState = () => {
  const [roundLength, setRoundLength] = useState(5);
  const [restLength, setRestLength] = useState(0);
  const [readyLength, setReadyLength] = useState(0);
  const [intervals, setIntervals] = useState(1);
  return {
    roundLength,
    restLength,
    readyLength,
    intervals,
    setRoundLength,
    setRestLength,
    setReadyLength,
    setIntervals
  }
}

export default useTimerState