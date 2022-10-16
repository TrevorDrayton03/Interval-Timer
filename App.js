import React, { useState, useRef, useEffect } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import Timer from "./src/components/Timer";
import { Dimensions } from "react-native";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

var { height, width } = Dimensions.get('window');


const App = () => {
  const [roundLength, setRoundLength] = useState(0);
  const [restLength, setRestLength] = useState(0);
  const [intervals, setIntervals] = useState(1);
  const [isRunning, setIsRunning] = useState(false);
  const [startTime, setStartTime] = useState(0);

  const interval = useRef();

  // const start = () => {
  //     setIsRunning(true);
  //     setStartTime(Date.now());
  // }

  // useEffect(() => {
  //     if (startTime > 0) {
  //         interval.current = setInterval(() => {
  //             setTimeout(() => Date.now() - startTime)
  //         }, 1)
  //     }
  //     else {
  //         if(interval.current) {
  //             clearInterval(interval.current);
  //             interval.current=undefined;
  //         }
  //     }
  // }, [startTime])

  return (
    <View style={styles.container}>
      <Timer
        name="Round Length"
        icon="boxing-glove"
        incremental={5}
        value={roundLength}
        setValue={setRoundLength}
        startVal={0}
        minVal={0}
        isDuration={true}
      >
      </Timer>
      <Timer
        name="Rest Time"
        icon="arrow-down-circle"
        incremental={5}
        value={restLength}
        setValue={setRestLength}
        startVal={0}
        minVal={0}
        isDuration={true}
      >
      </Timer>
      <Timer
        name="Rounds"
        icon="alarm-bell"
        incremental={1}
        value={intervals}
        setValue={setIntervals}
        startVal={1}
        minVal={1}
        isDuration={false}
      >
      </Timer>
      <TouchableOpacity
        style={{ marginTop: 75, marginBottom: 75 }}
        onPress={null}
      >
        <Icon
          name="send"
          size={50}
        >
        </Icon>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    //flex: 0,
    justifyContent: "flex-end",
    width: width,
    height: height,
    alignItems: "center"
  },
});
export default App;