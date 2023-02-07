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

  return (
    <View style={styles.container}>
      <View style={styles.smallercontainer}>
      </View>
      <View style={styles.smallercontainer}>
        <Timer
          name="Round Length"
          icon="boxing-glove"
          incremental={5}
          value={roundLength}
          setValue={setRoundLength}
          startValue={0}
          minValue={0}
          isDuration={true}
        >
        </Timer>
        <Timer
          name="Rest Time"
          icon="arrow-down-circle"
          incremental={5}
          value={restLength}
          setValue={setRestLength}
          startValue={0}
          minValue={0}
          isDuration={true}
        >
        </Timer>
        <Timer
          name="Rounds"
          icon="alarm-bell"
          incremental={1}
          value={intervals}
          setValue={setIntervals}
          startValue={1}
          minValue={1}
          isDuration={false}
        >
        </Timer>
      </View>
      <View style={styles.smallercontainer}>
        <TouchableOpacity
          style={{ marginTop: 0, marginBottom: 0 }}
          onPress={null}
        >
          <Icon
            name="send"
            size={50}
          >
          </Icon>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 0,
    justifyContent: "center",
    width: width,
    height: height,
    alignItems: "center",
  },
  smallercontainer: {
    flexDirection:"column",
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
});
export default App;