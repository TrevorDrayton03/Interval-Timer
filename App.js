import React from "react"
import { Text, View, StatusBar } from "react-native"
import Timer from "./src/components/Timer"
import FightClock from "./src/components/FightClock"
import StoreButton from "./src/components/StoreButton"
import Settings from "./src/components/Settings"
import styles from "./src/styles/styles"
import darkTheme from "./src/styles/darkTheme"
import useSetSounds from "./src/custom-hooks/useSetSounds"
import useTimerStates from "./src/custom-hooks/useTimerStates"
import { useKeepAwake } from "expo-keep-awake"
import { getDisplayTime } from "./src/helpers/helpers"
import { SettingsProvider } from './src/contexts/SettingsContext'

const App = () => {
  const {
    beepSound,
    singleBellSound,
    tripleBellSound
  } = useSetSounds()

  const {
    roundLength,
    restLength,
    readyLength,
    intervals,
    setRoundLength,
    setRestLength,
    setReadyLength,
    setIntervals
  } = useTimerStates()

  useKeepAwake()

  let trainingTime = roundLength * intervals + restLength * (intervals - 1)
  let displayTime = getDisplayTime(trainingTime)

  return (
    <SettingsProvider>
      <View style={[styles.container, darkTheme.container]}>
        <StatusBar
          backgroundColor={"#121212"}
          barStyle={'light-content'}
        >
        </StatusBar>
        <View style={styles.titleContainer}>
          <View>
            <Text style={[styles.titleText, darkTheme.onSurface]}>Interval Timer</Text>
          </View>
          <View >
            <Settings>
            </Settings>
          </View>
        </View>
        <View style={styles.durationContainer}>
          <Text style={[styles.trainingTime, darkTheme.onSurface]}>{roundLength > 0 ? displayTime : "0:00"}</Text>
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
        <View style={styles.fightClockContainer}>
          <FightClock
            restLength={restLength}
            roundLength={roundLength}
            intervals={intervals}
            readyLength={readyLength}
            beepSound={beepSound}
            tripleBellSound={tripleBellSound}
            singleBellSound={singleBellSound}
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
    </SettingsProvider>
  )
}

export default App