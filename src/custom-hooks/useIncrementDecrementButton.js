import { useState, useCallback } from "react";

const useIncrementDecrementButton = (count, countSetter, incremental, minValue) => {
  const [plusInterval, setPlusInterval] = useState(null);
  const [minusInterval, setMinusInterval] = useState(null);

  const onPlusPress = useCallback(() => {
    countSetter((prevCount) => prevCount + incremental);
  }, [countSetter, incremental]);

  const onMinusPress = useCallback(() => {
    if (count - incremental >= minValue) {
      countSetter((prevCount) => prevCount - incremental);
    } else {
      countSetter(minValue);
    }
  }, [count, countSetter, incremental, minValue]);

  const handlePlusPressIn = useCallback(() => {
    setPlusInterval(
      setInterval(
        () => countSetter((prevCount) => prevCount + incremental),
        150
      )
    );
  }, [countSetter, incremental]);

  const handlePlusPressOut = useCallback(() => {
    clearInterval(plusInterval);
    setPlusInterval(null);
  }, [plusInterval]);

  const handleMinusPressIn = useCallback(() => {
    setMinusInterval(
      setInterval(() => {
        countSetter((prevCount) => {
          if (prevCount <= minValue) {
            clearInterval(minusInterval);
            return minValue;
          } else {
            return prevCount - incremental;
          }
        });
      }, 150)
    );
  }, [countSetter, incremental, minValue, minusInterval]);

  const handleMinusPressOut = useCallback(() => {
    clearInterval(minusInterval);
    setMinusInterval(null);
  }, [minusInterval]);

  return {
    onPlusPress,
    onMinusPress,
    handlePlusPressIn,
    handlePlusPressOut,
    handleMinusPressIn,
    handleMinusPressOut,
  }
}

export default useIncrementDecrementButton;