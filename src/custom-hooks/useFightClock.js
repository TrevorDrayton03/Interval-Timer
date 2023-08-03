import { useEffect, useState, useCallback, useRef } from 'react'
import {
  Alert,
  AppState,
  Vibration,
  Dimensions
} from "react-native"
import { getDisplayTime } from "../../src/helpers/helpers"


const useFightClock = (intervals,
  restLength,
  roundLength,
  readyLength,
  beepSound,
  singleBellSound,
  tripleBellSound,
  isSoundsEnabled,
  isVibrationsEnabled,
) => {
  const [duration, setDuration] = useState(
    readyLength > 0 ? readyLength - 1 : roundLength - 1
  )
  const [rounds, setRounds] = useState(1)
  const [training, setTraining] = useState(null)
  const [modalVisible, setModalVisible] = useState(false)
  const [stopTime, setStopTime] = useState(null)
  const [pauseTime, setPauseTime] = useState(null)
  const [startTime, setStartTime] = useState(null)
  const [alteringState, setAlteringState] = useState(false)
  const appState = useRef(AppState.currentState)
  const [appStateVisible, setAppStateVisible] = useState(appState.current)
  const [timerState, setTimerState] = useState(null)
  const [paused, setPaused] = useState(false)
  let totalDuration =
    roundLength * intervals + restLength * (intervals - 1) + readyLength
  let displayTime = getDisplayTime(duration)

  const screenWidth = Dimensions.get('window').width
  const fontSize = Math.min(screenWidth * .25, 200)

  const onPressHandle = useCallback(() => {
    if (roundLength === 0) {
      Alert.alert("Warning", "Round length is 0!")
    } else {
      setStartTime(Date.now())
      setModalVisible(true)
      setTraining(
        setInterval(() => {
          setDuration((prevCount) => {
            return prevCount - 1
          })
        }, 1000)
      )
      if (readyLength > 0) {
        setTimerState("ready")
      } else {
        setTimerState("round")
      }
      setDuration(readyLength > 0 ? readyLength - 1 : roundLength - 1)
      setRounds(1)
    }
  }, [roundLength, readyLength])

  const pauseInterval = useCallback(() => {
    setPaused(true)
    clearInterval(training)
    setTraining(null)
    setPauseTime(Date.now())
  }, [training])

  const resumeInterval = useCallback(() => {
    setPaused(false)
    setStartTime((prevStartTime) => {
      const currentTime = Date.now()
      const elapsedTime = currentTime - pauseTime
      return prevStartTime + elapsedTime
    })
    setTraining(
      setInterval(() => {
        setDuration((prevCount) => {
          return prevCount - 1
        })
      }, 1000)
    )
  }, [pauseTime])

  const handleReadyState = useCallback((currentTime, readyLength) => {
    setTimerState("ready")
    setDuration(readyLength - currentTime)
    return ["ready", 1]
  }, [])

  const handleState = useCallback((i, timeline, currentTime, state) => {
    setRounds(Math.floor(i / 2) + 1)
    setTimerState(state)
    setDuration(timeline[i + 1] - currentTime)
  }, [])

  const handleRoundOrRestState = useCallback((currentTime, timeline, restLength) => {
    for (let i = 0; i < timeline.length; i++) {
      if (restLength > 0) {
        if (
          i % 2 === 0 &&
          timeline[i] <= currentTime &&
          currentTime < timeline[i + 1]
        ) {
          handleState(i, timeline, currentTime, "round")
          return ["round", Math.floor(i / 2) + 1]
        } else if (
          i % 2 === 1 &&
          timeline[i] <= currentTime &&
          currentTime < timeline[i + 1]
        ) {
          handleState(i, timeline, currentTime, "rest")
          return ["rest", Math.floor(i / 2) + 1]
        }
      } else {
        if (timeline[i] <= currentTime && currentTime < timeline[i + 1]) {
          setRounds(i + 1)
          setDuration(timeline[i + 1] - currentTime)
          setTimerState("round")
          return ["round", i + 1]
        }
      }
    }
  }, [])

  const resetOnClose = useCallback(() => {
    setModalVisible(false)
    clearInterval(training)
    setTraining(null)
    setStartTime(null)
    setAlteringState(false)
    setStopTime(null)
    setPaused(false)
  }, [setModalVisible, training, setTraining, setStartTime, setAlteringState, setStopTime, setPaused, clearInterval])

  useEffect(() => {
    const subscription = AppState.addEventListener("change", (nextAppState) => {
      if (appState.current.match(/active/) && nextAppState === "background") {
        setStopTime(Date.now())
      }
      appState.current = nextAppState
      setAppStateVisible(appState.current)
    })

    return () => {
      subscription.remove()
    }
  }, [])

  useEffect(() => {
    if (!alteringState) {
      if (timerState === "rest") {
        setDuration(restLength - 1)
      }
      if (timerState === "round") {
        setDuration(roundLength - 1)
      }
      if (timerState === "ready") {
        setDuration(readyLength - 1)
      }
    }
    setAlteringState(false)
  }, [timerState, rounds])

  useEffect(() => {
    if (stopTime !== null) {
      let prevTimerState = timerState
      let prevRounds = rounds
      let newTimerState
      let newRounds
      setAlteringState(true)
      const currentTime = Math.floor((Date.now() - startTime) / 1000)
      const remainingTime = totalDuration - currentTime
      if (remainingTime > 0) {
        if (currentTime < readyLength) {
          [newTimerState, newRounds] = handleReadyState(
            currentTime,
            readyLength
          )
        }
        else {
          const timeline = [readyLength]
          if (restLength > 0) {
            for (let i = 1; i <= intervals; i++) {
              let ti_1 = roundLength * i + restLength * (i - 1) + readyLength
              let ti_2 = roundLength * i + restLength * i + readyLength
              if (i != intervals) {
                timeline.push(ti_1, ti_2)
              } else {
                timeline.push(ti_1)
              }
            }
          } else {
            for (let i = 1; i <= intervals; i++) {
              timeline.push(roundLength * i + readyLength)
            }
          }
          [newTimerState, newRounds] = handleRoundOrRestState(
            currentTime,
            timeline,
            restLength
          )
        }
      } else {
        clearInterval(training)
        setTraining(null)
        setTimerState("complete")
        isSoundsEnabled ? tripleBellSound.replayAsync() : null
        isVibrationsEnabled ? Vibration.vibrate(1500) : null
      }
      if (prevTimerState === newTimerState && prevRounds === newRounds) {
        setAlteringState(false)
      } else {
      }
    } else {
      if (timerState === "ready" && duration === -1 && rounds === 1) {
        setTimerState("round")
      }
      if (duration === -1 && rounds != intervals) {
        if (restLength > 0 && timerState != "ready") {
          if (timerState === "rest") {
            setTimerState("round")
          } else if (timerState === "round") {
            setTimerState("rest")
          }
        }
        setRounds((prevCount) => {
          isSoundsEnabled ? singleBellSound.replayAsync() : null
          isVibrationsEnabled ? Vibration.vibrate() : null
          if (timerState === "ready") {
            return prevCount
          }
          if (timerState === "rest" && restLength != 0) {
            return prevCount + 1
          }
          if (restLength === 0) {
            return prevCount + 1
          } else {
            return prevCount
          }
        })
      }
      if (duration === -1 && rounds === intervals && timerState != "ready") {
        clearInterval(training)
        setTraining(null)
        setTimerState("complete")
        isSoundsEnabled ? tripleBellSound.replayAsync() : null
        isVibrationsEnabled ? Vibration.vibrate(1500) : null
        setStartTime(null)
      }
      if (
        duration === -1 &&
        rounds === intervals &&
        intervals === 1 &&
        timerState === "ready"
      ) {
        isSoundsEnabled ? singleBellSound.replayAsync() : null
      }
    }
    if (duration <= 2 && duration >= 0 && timerState !== null) {
      isSoundsEnabled ? beepSound.replayAsync() : null
    }
    setStopTime(null)
    setPauseTime(null)
  }, [duration])

  return {
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
  }
}

export default useFightClock