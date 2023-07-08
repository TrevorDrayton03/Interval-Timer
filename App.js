import React, { useState } from "react";
import { Text, View, StatusBar } from "react-native";
import Timer from "./src/components/Timer";
import FightClock from "./src/components/FightClock";
import StoreButton from "./src/components/StoreButton";
import styles from "./src/styles/styles";
import darkTheme from "./src/styles/darkTheme";
import helpers from "./src/helpers/helpers";
import KeepAwake from 'react-native-keep-awake';

const App = () => {
  const [roundLength, setRoundLength] = useState(5);
  const [restLength, setRestLength] = useState(0);
  const [readyLength, setReadyLength] = useState(0);
  const [intervals, setIntervals] = useState(1);

  let trainingTime = roundLength * intervals + restLength * (intervals - 1);
  let displayTime = helpers.displayTime(trainingTime)

  return (
    <View style={[styles.container, darkTheme.container]}>
      <StatusBar
        backgroundColor={"#121212"}
        barStyle={'light-content'}
      >
      </StatusBar>
      <View style={styles.titleContainer}>
        <Text style={[styles.trainingTime, darkTheme.onSurface]}>Effective Duration: {roundLength > 0 ? displayTime : "0:00"}</Text>
      </View>
      <View style={[styles.smallerContainer, darkTheme.surface]}>
        <Timer
          name="Round"
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
          name="Rest"
          icon="pause-octagon"
          incremental={5}
          value={restLength}
          setValue={setRestLength}
          startValue={0}
          minValue={0}
          isDuration={true}
        >
        </Timer>
        <Timer
          name="Ready"
          icon="checkbox-marked"
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
          icon="timer"
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
          <KeepAwake />
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