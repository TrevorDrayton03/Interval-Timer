import React, { useEffect, useState, useRef } from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  Alert,
  AppState,
  Vibration,
  Dimensions
} from "react-native";
import { Audio } from "expo-av";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import styles from "../styles/styles";
import darkTheme from "../styles/darkTheme";
import helpers from "../helpers/helpers";
import Icon2 from "react-native-vector-icons/MaterialIcons";

const FightClock = ({ intervals, restLength, roundLength, readyLength }) => {
  const [duration, setDuration] = useState(
    readyLength > 0 ? readyLength - 1 : roundLength - 1
  );
  const [rounds, setRounds] = useState(1);
  const [training, setTraining] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [stopTime, setStopTime] = useState(null);
  const [pauseTime, setPauseTime] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const [alteringState, setAlteringState] = useState(false);
  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);
  const [timerState, setTimerState] = useState(null);
  const [singleBellSound, setSingleBellSound] = useState();
  const [tripleBellSound, setTripleBellSound] = useState();
  const [beepSound, setBeepSound] = useState();
  const [paused, setPaused] = useState(false);

  let totalDuration =
    roundLength * intervals + restLength * (intervals - 1) + readyLength;
  let displayTime = helpers.displayTime(duration);

  const screenWidth = Dimensions.get('window').width;
  const fontSize = Math.min(screenWidth * .25, 200);

  const onPressHandle = () => {
    if (roundLength === 0) {
      Alert.alert("Warning", "Round length is 0!");
    } else {
      setStartTime(Date.now());
      setModalVisible(true);
      setTraining(
        setInterval(() => {
          setDuration((prevCount) => {
            return prevCount - 1;
          });
        }, 1000)
      );
      if (readyLength > 0) {
        setTimerState("ready");
      } else {
        setTimerState("round");
      }
      setDuration(readyLength > 0 ? readyLength - 1 : roundLength - 1);
      setRounds(1);
    }
  };

  const pauseInterval = () => {
    setPaused(true);
    clearInterval(training);
    setTraining(null);
    setPauseTime(Date.now());
  };

  const resumeInterval = () => {
    setPaused(false);
    setStartTime((prevStartTime) => {
      const currentTime = Date.now();
      const elapsedTime = currentTime - pauseTime;
      return prevStartTime + elapsedTime;
    });
    setTraining(
      setInterval(() => {
        setDuration((prevCount) => {
          return prevCount - 1;
        });
      }, 1000)
    );
  };

  const handleReadyState = (currentTime, readyLength) => {
    setTimerState("ready");
    setDuration(readyLength - currentTime);
    return ["ready", 1];
  };

  const handleState = (i, timeline, currentTime, state) => {
    setRounds(Math.floor(i / 2) + 1);
    setTimerState(state);
    setDuration(timeline[i + 1] - currentTime);
  };

  const handleRoundOrRestState = (currentTime, timeline, restLength) => {
    for (let i = 0; i < timeline.length; i++) {
      if (restLength > 0) {
        if (
          i % 2 === 0 &&
          timeline[i] <= currentTime &&
          currentTime < timeline[i + 1]
        ) {
          handleState(i, timeline, currentTime, "round");
          return ["round", Math.floor(i / 2) + 1];
        } else if (
          i % 2 === 1 &&
          timeline[i] <= currentTime &&
          currentTime < timeline[i + 1]
        ) {
          handleState(i, timeline, currentTime, "rest");
          return ["rest", Math.floor(i / 2) + 1];
        }
      } else {
        if (timeline[i] <= currentTime && currentTime < timeline[i + 1]) {
          setRounds(i + 1);
          setDuration(timeline[i + 1] - currentTime);
          setTimerState("round");
          //console.log(timeline[i + 1] - currentTime, "  no rest time duration")
          return ["round", i + 1];
        }
      }
    }
  };

  useEffect(() => {
    async function playSingleBell() {
      let { sound } = await Audio.Sound.createAsync(
        require("../sounds/single-bell(1.5s).mp3")
      );
      setSingleBellSound(sound);
    }
    async function playTripleBell() {
      let { sound } = await Audio.Sound.createAsync(
        require("../sounds/triple-bell(1.5s).mp3")
      );
      setTripleBellSound(sound);
    }
    async function playBeep() {
      let { sound } = await Audio.Sound.createAsync(
        require("../sounds/beep.wav")
      );
      setBeepSound(sound);
    }
    playSingleBell()
    playTripleBell()
    playBeep()

    const subscription = AppState.addEventListener("change", (nextAppState) => {
      if (appState.current.match(/active/) && nextAppState === "background") {
        setStopTime(Date.now());
      }
      appState.current = nextAppState;
      setAppStateVisible(appState.current);
    });

    return () => {
      subscription.remove();
    };
  }, []);

  // duration handler
  // hooked into the timerState
  useEffect(() => {
    if (!alteringState) {
      if (timerState === "rest") {
        setDuration(restLength - 1);
      }
      if (timerState === "round") {
        setDuration(roundLength - 1);
      }
      if (timerState === "ready") {
        setDuration(readyLength - 1);
      }
    }
    setAlteringState(false);
  }, [timerState, rounds]);

  // timerState handler
  // hooked into the duration
  useEffect(() => {
    if (stopTime !== null) {
      let prevTimerState = timerState;
      let prevRounds = rounds;
      let newTimerState;
      let newRounds;
      setAlteringState(true);
      const currentTime = Math.floor((Date.now() - startTime) / 1000);
      //console.log(currentTime, " currentTime var")
      const remainingTime = totalDuration - currentTime;
      //console.log(remainingTime, " remainingTime var")
      // if the timer is not done
      if (remainingTime > 0) {
        // if it's in ready state
        if (currentTime < readyLength) {
          [newTimerState, newRounds] = handleReadyState(
            currentTime,
            readyLength
          );
        }
        // if it's not in ready state then its in rest or round state
        else {
          // do logic with remaining duration to determine which state the app needs to be in
          const timeline = [readyLength];
          if (restLength > 0) {
            for (let i = 1; i <= intervals; i++) {
              let ti_1 = roundLength * i + restLength * (i - 1) + readyLength;
              let ti_2 = roundLength * i + restLength * i + readyLength;
              if (i != intervals) {
                timeline.push(ti_1, ti_2);
              } else {
                timeline.push(ti_1);
              }
            }
          } else {
            for (let i = 1; i <= intervals; i++) {
              timeline.push(roundLength * i + readyLength);
            }
          }
          // console.log(timeline, " timeline")
          [newTimerState, newRounds] = handleRoundOrRestState(
            currentTime,
            timeline,
            restLength
          );
        }
      } else {
        clearInterval(training);
        setTraining(null);
        setTimerState("complete");
        tripleBellSound.replayAsync();
        Vibration.vibrate(1500);
      }
      //console.log(prevTimerState, newTimerState);
      //console.log(prevRounds, newRounds);
      if (prevTimerState === newTimerState && prevRounds === newRounds) {
        setAlteringState(false);
        //console.log("exact same!");
      } else {
        //console.log("NOT same!");
      }
    } else {
      if (timerState === "ready" && duration === -1 && rounds === 1) {
        setTimerState("round");
      }
      if (duration === -1 && rounds != intervals) {
        if (restLength > 0 && timerState != "ready") {
          if (timerState === "rest") {
            setTimerState("round");
          } else if (timerState === "round") {
            setTimerState("rest");
          }
        }
        setRounds((prevCount) => {
          console.log("reached setRounds");
          singleBellSound.replayAsync();
          Vibration.vibrate();
          if (timerState === "ready") {
            return prevCount;
          }
          if (timerState === "rest" && restLength != 0) {
            return prevCount + 1;
          }
          if (restLength === 0) {
            return prevCount + 1;
          } else {
            return prevCount;
          }
        });
      }
      if (duration === -1 && rounds === intervals && timerState != "ready") {
        clearInterval(training);
        setTraining(null);
        setTimerState("complete");
        tripleBellSound.replayAsync();
        Vibration.vibrate(1500);
        setStartTime(null);
      }
      if (
        duration === -1 &&
        rounds === intervals &&
        intervals === 1 &&
        timerState === "ready"
      ) {
        singleBellSound.replayAsync();
      }
    }
    if (duration <= 2 && duration >= 0) {
      beepSound.replayAsync()
    }
    setStopTime(null);
    setPauseTime(null)
  }, [duration]);

  const resetOnClose = () => {
    setModalVisible(false);
    clearInterval(training);
    setTraining(null);
    setStartTime(null);
    setAlteringState(false);
    setStopTime(null);
    setPaused(false);
  }

  return (
    <View>
      <TouchableOpacity onPress={onPressHandle} style={{ padding: 10 }}>
        <Icon name="play-circle-outline" size={70} color="#BB86FC"></Icon>
      </TouchableOpacity>
      <Modal
        visible={modalVisible}
        animationType="fade"
        onRequestClose={resetOnClose}
      >
        <View
          style={[
            styles.fightClockModalContainer,
            darkTheme.fightClockModalContainer,
          ]}
        >
          {timerState === "ready" && (
            <View style={{ flexDirection: 'column', flex: .55, justifyContent: 'flex-end', alignItems: 'center' }}>
              <Text style={[styles.text, darkTheme.onSurface, { fontSize, textAlign: 'center' }]}>
                {displayTime}
              </Text>
              <Text style={[styles.text, darkTheme.onSurface, { fontSize: 40, textAlign: 'center' }]}>
                Get Ready
              </Text>
              <Text style={[styles.text, darkTheme.onSurface, { fontSize: 30, textAlign: 'center' }]}>
              </Text>
            </View>
          )}
          {timerState === "round" && (
            <View style={{ flexDirection: 'column', flex: .55, justifyContent: 'flex-end', alignItems: 'center' }}>
              <Text style={[styles.text, darkTheme.onSurface, { fontSize, textAlign: 'center' }]}>
                {displayTime}
              </Text>
              <Text style={[styles.text, darkTheme.onSurface, { fontSize: 40, textAlign: 'center' }]}>
                Round
              </Text>
              <Text style={[styles.text, darkTheme.onSurface, { fontSize: 30, textAlign: 'center' }]}>
                {rounds} / {intervals}
              </Text>
            </View>
          )}
          {timerState === "rest" && (
            <View style={{ flexDirection: 'column', flex: .55, justifyContent: 'flex-end', alignItems: 'center' }}>
              <Text style={[styles.text, darkTheme.onSurface, { fontSize, textAlign: 'center' }]}>
                {displayTime}
              </Text>
              <Text style={[styles.text, darkTheme.onSurface, { fontSize: 40, textAlign: 'center' }]}>
                Rest
              </Text>
              <Text style={[styles.text, darkTheme.onSurface, { fontSize: 30, textAlign: 'center' }]}>
                {rounds} / {intervals}
              </Text>
            </View>
          )}
          {timerState === "complete" && (
            <View style={{ flexDirection: 'column', flex: .575, justifyContent: 'flex-end', alignItems: 'center' }}>
              <Text style={[styles.fightClockComplete, darkTheme.onSurface, { fontSize, textAlign: 'center' }]}>
                DONE
              </Text>
              <Text style={[styles.text, darkTheme.onSurface, { fontSize: 40, textAlign: 'center' }]}>
                {/* for spacing */}
              </Text>
              <Text style={[styles.text, darkTheme.onSurface, { fontSize: 40, textAlign: 'center' }]}>
                {/* for spacing */}
              </Text>
            </View>
          )}
          <View style={{ flexDirection: 'column', flex: .215, justifyContent: 'flex-end', alignItems: 'center' }}>
            {timerState !== "complete" && (
              <TouchableOpacity onPress={paused ? resumeInterval : pauseInterval}>
                {paused ? (
                  <Icon2 name={"play-circle-outline"} size={70} style={{ padding: 10 }} color="#BB86FC" />
                ) : (
                  <Icon2 name={"pause-circle-outline"} size={70} style={{ padding: 10 }} color="#BB86FC" />
                )}
              </TouchableOpacity>
            )}
          </View>
          <View style={styles.fightClockBackColumn}>
            <View style={styles.row}>
              <View style={styles.fightClockBackButton}>
                <TouchableOpacity onPress={resetOnClose} style={{ padding: 10 }}>
                  <Icon2 name="arrow-back" size={40} color="#03DAC6" />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default FightClock;
