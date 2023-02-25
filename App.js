import React, { useState } from "react";
import { Text, View } from "react-native";
import Timer from "./src/components/Timer";
import FightClock from "./src/components/FightClock";
import StoreButton from "./src/components/StoreButton";
import { styles } from "./src/styles/styles"

const App = () => {
  const [roundLength, setRoundLength] = useState(5);
  const [restLength, setRestLength] = useState(0);
  const [readyLength, setReadyLength] = useState(0);
  const [intervals, setIntervals] = useState(1);

  const zeroPad = (num) => {
    if (typeof (num) != typeof (String)) {
      let numString = num.toString().padStart(2, "0");
      return numString;
    }
    else {
      let numString = num.padStart(2, "0");
      return numString;
    }
  }

  let timeVal = roundLength * intervals + restLength * (intervals - 1);
  let seconds = timeVal % 60;
  let minutes = Math.floor(timeVal / 60) % 60;
  let hours = Math.floor(minutes / 60) % 24;
  seconds = zeroPad(seconds);
  if (hours == 0) {
    var displayTime = minutes + ":" + seconds;
  }
  else if (roundLength == 0) {
    var displayTime = hours + "0:0" + minutes + ":" + seconds;
  }
  else {
    var displayTime = hours + ":" + minutes + ":" + seconds;
  }

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.trainingTime}>Training Time: {roundLength > 0 ? displayTime : "0:00"}</Text>
      </View>
      <View style={styles.smallerContainer}>
        <Timer
          name="Round Time"
          icon="boxing-glove"
          incremental={5}
          value={roundLength}
          setValue={setRoundLength}
          startValue={5}
          minValue={5}
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
          name="Ready Time"
          icon="timelapse"
          incremental={5}
          value={readyLength}
          setValue={setReadyLength}
          startValue={0}
          minValue={0}
          isDuration={true}
        >
        </Timer>
        <Timer
          name="Intervals"
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
      <View style={styles.startButtonContainer}>
        <FightClock
          intervals={intervals}
          restLength={restLength}
          roundLength={roundLength}
          readyLength={readyLength}
        >
        </FightClock>
      </View>
      <View style={styles.column}>
        <View style={styles.row}>
          <View style={styles.storeButtonContainer}>
            <StoreButton
              intervals={intervals}
              restLength={restLength}
              roundLength={roundLength}
              readyLength={readyLength}
              setIntervals={setIntervals}
              setRestLength={setRestLength}
              setRoundLength={setRoundLength}
              setReadyLength={setReadyLength}
            >
            </StoreButton>
          </View>
        </View>
      </View>
    </View>
  );
}

export default App;