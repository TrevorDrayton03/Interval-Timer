import React, { useEffect, useState, useRef } from "react";
import { Modal, View, Text, TouchableOpacity, Alert, AppState, Vibration } from "react-native";
import { Audio } from 'expo-av';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from "../styles/styles"
import helpers from "../helpers/helpers"

// AppState example:
// https://snack.expo.dev/@aboutreact/appstate-example?session_id=snack-session-y4eB29bZK

const FightClock = ({ intervals, restLength, roundLength, readyLength }) => {
    const [duration, setDuration] = useState((readyLength > 0 ? readyLength - 1 : roundLength - 1));
    const [rounds, setRounds] = useState(1);
    const [training, setTraining] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [stopTime, setStopTime] = useState(null);
    const [startTime, setStartTime] = useState(null);
    const [alteringState, setAlteringState] = useState(false);
    const appState = useRef(AppState.currentState);
    const [appStateVisible, setAppStateVisible] = useState(appState.current);
    const [timerState, setTimerState] = useState(null);
    const [singleBellSound, setSingleBellSound] = useState();
    const [tripleBellSound, setTripleBellSound] = useState();


    let totalDuration = roundLength * intervals + restLength * (intervals - 1) + readyLength;
    let displayTime = helpers.displayTime(duration)

    useEffect(() => {
        async function playSingleBell() {
            const { sound } = await Audio.Sound.createAsync(require('../sounds/single-bell(1.5s).mp3'))
            setSingleBellSound(sound);
        }
        async function playTripleBell() {
            const { sound } = await Audio.Sound.createAsync(require('../sounds/triple-bell(1.5s).mp3'))
            setTripleBellSound(sound);
        }
        playSingleBell();
        playTripleBell();

        const subscription = AppState.addEventListener('change', nextAppState => {
            if (
                appState.current.match(/active/) &&
                nextAppState === 'background'
            ) {
                setStopTime(Date.now())
            }
            appState.current = nextAppState;
            setAppStateVisible(appState.current);
        });

        return () => {
            subscription.remove();
        };
    }, []);

    // sets duration when app is in appState is active
    useEffect(() => {
        if (!alteringState) {
            if (timerState == 'rest') {
                setDuration(restLength - 1);
            }
            if (timerState == 'round') {
                setDuration(roundLength - 1);
            }
            if (timerState == 'ready') {
                setDuration(readyLength - 1);
            }
        }
        setAlteringState(false)
    }, [timerState, rounds]);

    useEffect(() => {
        if (stopTime !== null) {
            setAlteringState(true)
            const currentTime = Math.floor((Date.now() - startTime) / 1000);
            const remainingTime = totalDuration - currentTime;
            // if the timer is not done
            if (remainingTime > 0) {
                // if should be in ready state
                if (currentTime < readyLength) {
                    setTimerState('ready')
                    setDuration(readyLength - currentTime);
                    setAlteringState(false)
                }
                // if should be in round or rest state
                else {
                    // do logic with remaining duration to determine which state the app needs to be in 
                    const timeline = [readyLength];
                    if (restLength > 0) {
                        for (let i = 1; i <= intervals; i++) {
                            let ti_1 = (roundLength * i + restLength * (i - 1) + readyLength)
                            let ti_2 = (roundLength * i + restLength * i + readyLength)
                            if (i != intervals) {
                                timeline.push(ti_1, ti_2)
                            }
                            else {
                                timeline.push(ti_1)
                            }
                        }
                    }
                    else {
                        for (let i = 1; i <= intervals; i++) {
                            timeline.push(roundLength * i + readyLength)
                        }
                    }
                    // loop through timeline to determine where current time stands
                    for (let i = 0; i < timeline.length; i++) {
                        // if there is rest time
                        if (restLength > 0) {
                            // round
                            if (i % 2 == 0 && (timeline[i] <= currentTime && currentTime < timeline[i + 1])) {
                                if ((Math.floor(i / 2)) + 1 === rounds) {
                                    setAlteringState(false)
                                }
                                setRounds((Math.floor(i / 2)) + 1);
                                setTimerState('round');
                                setDuration(timeline[i + 1] - currentTime);
                            }
                            // rest
                            else if (i % 2 == 1 && (timeline[i] <= currentTime && currentTime < timeline[i + 1])) {
                                if ((Math.floor(i / 2)) + 1 === rounds) {
                                    setAlteringState(false)
                                }
                                setRounds(Math.floor(i / 2) + 1);
                                setTimerState('rest');
                                setDuration(timeline[i + 1] - currentTime);
                            }
                        }
                        // if there isn't rest time
                        else {
                            if (timeline[i] <= currentTime && currentTime < timeline[i + 1]) {
                                setAlteringState(false)
                                setRounds(i + 1);
                                setDuration(timeline[i + 1] - currentTime);
                                setTimerState('round');
                            }
                        }
                    }
                }
            }
            // if complete
            else {
                clearInterval(training);
                setTraining(null);
                setTimerState('complete');
                tripleBellSound.replayAsync();
                Vibration.vibrate(1500);
            }
        }
        else {
            // go from ready to round
            if (timerState == 'ready' && duration == -1 && rounds == 1) {
                setTimerState('round')
            }
            // toggle rest if not ready and if there is a restlength
            // go from round to rest and from rest to round if it's not the last round
            if (duration == -1 && rounds != intervals) {
                if (restLength > 0 && timerState != 'ready') {
                    if (timerState == 'rest') {
                        setTimerState('round');
                    }
                    else if (timerState == 'round') {
                        setTimerState('rest');
                    }
                }
                setRounds(prevCount => {
                    singleBellSound.replayAsync()
                    Vibration.vibrate();
                    if (timerState == 'ready') { return prevCount }
                    if (timerState == 'rest' && restLength != 0) { return prevCount + 1; }
                    if (restLength === 0) { return prevCount + 1; }
                    else { return prevCount; }
                });
            }
            if (duration === -1 && rounds === intervals && timerState != 'ready') {
                clearInterval(training);
                setTraining(null);
                setTimerState('complete');
                tripleBellSound.replayAsync();
                Vibration.vibrate(1500);
                setStartTime(null);
            }
        }
        setStopTime(null);
    }, [duration]);

    const onPressHandle = () => {
        if (roundLength == 0) {
            Alert.alert(
                'Warning',
                'Round length is 0!'
            )
        } else {
            setStartTime(Date.now());
            setModalVisible(true);
            setTraining(setInterval(() => {
                setDuration(prevCount => {
                    return prevCount - 1;
                });
            }, 1000));
            if (readyLength > 0) {
                setTimerState('ready')
            }
            else {
                setTimerState('round')
            }
            setDuration(readyLength > 0 ? readyLength - 1 : roundLength - 1);
            setRounds(1);
        }
    };

    return (
        <View>
            <TouchableOpacity
                onPress={onPressHandle}
            >
                <Icon
                    name="send"
                    size={50}
                >
                </Icon>
            </TouchableOpacity>
            <Modal
                visible={modalVisible}
                animationType="fade"
                onRequestClose={() => {
                    setModalVisible(false);
                    clearInterval(training);
                    setTraining(null);
                    setStartTime(null);
                    setAlteringState(false);
                    setStopTime(null);
                }}
            >
                <View style={styles.fightClockModalContainer}>
                    {timerState == 'ready' &&
                        <View>
                            <Text style={styles.text}>Ready Time Left: {displayTime}</Text>
                        </View>
                    }
                    {timerState == 'round' &&
                        <View>
                            <Text style={styles.text}>Round Time Left: {displayTime}</Text>
                            <Text style={styles.text}>Round: {rounds}</Text>
                        </View>
                    }
                    {timerState == 'rest' &&
                        <View>
                            <Text style={styles.text}>Rest Time Left: {displayTime}</Text>
                            <Text style={styles.text}>Round: {rounds}</Text>
                        </View>
                    }
                    {timerState == 'complete' &&
                        <View>
                            <Text style={styles.fightClockComplete}>DONE!</Text>
                        </View>
                    }
                </View>
            </Modal >
        </View>
    )
};

export default FightClock;