import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Timer from "./src/components/Timer";
import { Dimensions } from "react-native";

var { height, width } = Dimensions.get('window');


const App = () => {
  // the three states below currently do absolutely nothing
  const [roundLength, setRoundLength] = useState();
  const [restLength, setRestLength] = useState();
  const [intervals, setIntervals] = useState(1);

  return (
    <View style={styles.container}>
      <Timer
        name="Round Length"
        icon="boxing-glove"
        incremental={5}
        roundLength={roundLength}
        startVal={0}
        minVal={0}
      >
      </Timer>
      <Timer
        name="Rest Time"
        icon="arrow-down-circle"
        incremental={5}
        restLength={restLength}
        startVal={0}
        minVal={0}
        >
      </Timer>
      <Timer
        name="Rounds"
        icon="alarm-bell"
        incremental={1}
        intervals={intervals}
        startVal={1}
        minVal={1}
      >
      </Timer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    //flex: 0,
    justifyContent: "center",
    width: width,
    height: height
  },
});
export default App;