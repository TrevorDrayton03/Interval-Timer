import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Timer from "./src/components/Timer";
import FightClock from "./src/components/FightClock";
import StoreButton from "./src/components/StoreButton";

const App = () => {
  const [roundLength, setRoundLength] = useState(0);
  const [restLength, setRestLength] = useState(0);
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
      <View style={styles.titlecontainer}>
        <Text style={{ fontSize: 28 }}>Total Time: {roundLength > 0 ? displayTime : "0:00"}</Text>
      </View>
      <View style={styles.smallercontainer}>
        <Timer
          name="Round Time"
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
      <View style={styles.startbuttoncontainer}>
        <FightClock
          intervals={intervals}
          restLength={restLength}
          roundLength={roundLength}
        >
        </FightClock>
      </View>
      <View style={styles.column}>
        <View style={styles.row}>
          <View style={styles.storebuttoncontainer}>
            <StoreButton
              intervals={intervals}
              restLength={restLength}
              roundLength={roundLength}
              setIntervals={setIntervals}
              setRestLength={setRestLength}
              setRoundLength={setRoundLength}
            >
            </StoreButton>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  smallercontainer: {
    flexDirection: "column",
    flex: .9,
    alignItems: "center",
    justifyContent: "center"
  },
  titlecontainer: {
    flexDirection: "column",
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  startbuttoncontainer: {
    flexDirection: "row",
    flex: .6,
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  storebuttoncontainer: {
    flexDirection: "row",
    flex: .82,
    justifyContent: "flex-start"
  },
  row: {
    flexDirection: "row",
  },
  column: {
    flex: .25,
    alignItems: "flex-start"
  },

});
export default App;