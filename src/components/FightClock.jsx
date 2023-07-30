import React from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import styles from "../styles/styles";
import darkTheme from "../styles/darkTheme";
import Icon2 from "react-native-vector-icons/MaterialIcons";
import useFightClock from "../custom-hooks/useFightClock";
import { useKeepAwake } from "expo-keep-awake";

const FightClock = ({ intervals, restLength, roundLength, readyLength, beepSound, singleBellSound, tripleBellSound }) => {
  const {
    rounds,
    modalVisible,
    timerState,
    paused,
    displayTime,
    fontSize,
    onPressHandle,
    pauseInterval,
    resumeInterval,
    resetOnClose,
  } = useFightClock(intervals, restLength, roundLength, readyLength, beepSound, singleBellSound, tripleBellSound)

  useKeepAwake()

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
          <View style={{ flexDirection: 'column', flex: .35, justifyContent: 'flex-end', alignItems: 'center' }}>
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
