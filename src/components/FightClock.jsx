import React, { useEffect, useState, useRef } from "react";
import { Modal, View, Text, TouchableOpacity, Alert, AppState } from "react-native";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from "../styles/styles"
import helpers from "../helpers/helpers"

const FightClock = ({ intervals, restLength, roundLength, readyLength }) => {
    const [duration, setDuration] = useState((readyLength > 0 ? readyLength - 1 : roundLength - 1));
    const [rounds, setRounds] = useState(1);
    const [training, setTraining] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [rest, setRest] = useState(false);
    const [ready, setReady] = useState(false);
    const [complete, setComplete] = useState(false);
    const [stopTime, setStopTime] = useState(null);
    const [startTime, setStartTime] = useState(null);
    const [alteringState, setAlteringState] = useState(false);
    const appState = useRef(AppState.currentState);
    const [appStateVisible, setAppStateVisible] = useState(appState.current);

    let totalDuration = roundLength * intervals + restLength * (intervals - 1) + readyLength;
    let displayTime = helpers.displayTime(duration)

    useEffect(() => {
        const subscription = AppState.addEventListener('change', nextAppState => {
            if (
                appState.current.match(/active/) &&
                nextAppState === 'background'
            ) {
                setStopTime(Date.now())
            }

            appState.current = nextAppState;
            setAppStateVisible(appState.current);
            console.log('AppState', appState.current);
        });

        return () => {
            subscription.remove();
        };
    }, []);

    useEffect(() => {
        if (!alteringState) {
            console.log("rest useEffect")
            if (rest) {
                setDuration(restLength > 0 ? restLength - 1 : roundLength - 1);
            } else {
                setDuration(roundLength - 1);
            }
        }
        setAlteringState(false)
    }, [rest]);

    useEffect(() => {
        if (!alteringState) {
            console.log("ready useEffect")
            if (!ready) {
                setDuration(roundLength - 1);
            } else {
                setDuration(readyLength - 1)
            }
        }
        setAlteringState(false)
    }, [ready]);

    useEffect(() => {
        if (!alteringState) {
            console.log("rounds useEffect")
            if (!rest && !ready) {
                setDuration(roundLength - 1);
            }
        }
        setAlteringState(false)
    }, [rounds]);

    // the key to getting the FightClock to work as intended is having this use effect trigger the above use effects [rest, ready, rounds]
    // otherwise, there is one too many steps in the interval that could not be avoided
    useEffect(() => {
        if (stopTime !== null) {
            setAlteringState(true)
            console.log("stoptime not null")
            const currentTime = Math.floor((Date.now() - startTime) / 1000);
            const remainingTime = totalDuration - currentTime;
            console.log(remainingTime, " reimainingTime")
            // if the timer is not done
            if (remainingTime > 0) {
                // if should be in ready state
                if (currentTime < readyLength) {
                    setDuration(readyLength - currentTime);
                }
                // if should be in round or rest state
                else {
                    setReady(false);
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
                    console.log("timeline: ", timeline)
                    // loop through timeline to determine where current time stands
                    for (let i = 0; i < timeline.length; i++) {
                        // if there is rest time
                        if (restLength > 0) {
                            // round
                            if (i % 2 == 0 && (timeline[i] <= currentTime && currentTime < timeline[i + 1])) {
                                setRounds((Math.floor(i / 2)) + 1);
                                setRest(false);
                                setDuration(timeline[i + 1] - currentTime);
                                console.log(timeline[i + 1], currentTime)
                                console.log(timeline[i + 1] - currentTime)
                                console.log(i, ": round, ", duration, ": duration for round in condition 1")
                            }
                            // rest
                            else if (i % 2 == 1 && (timeline[i] <= currentTime && currentTime < timeline[i + 1])) {
                                setRounds(Math.floor(i / 2) + 1);
                                setRest(true);
                                setDuration(timeline[i + 1] - currentTime);
                                console.log(i, ": round, ", duration, ": duration for rest in condition 2")
                            }
                        }
                        // if there isn't rest time
                        else {
                            if (timeline[i] <= currentTime && currentTime < timeline[i + 1]) {
                                setRounds(i + 1);
                                setDuration(timeline[i + 1] - currentTime);
                                console.log(i, ": round, ", duration, ": duration for round in condition 3")

                            }
                        }
                    }
                }
            }
            // if complete
            else {
                clearInterval(training);
                setTraining(null);
                setComplete(true)
            }
        }
        else {
            if (ready && duration == -1 && rounds == 1) {
                setReady(false)
            }
            if (duration == -1 && rounds != intervals) {
                if (restLength > 0 && ready == false) {
                    setRest(!rest);
                }
                console.log("setRounds trigger in 2nd part of duration useEffect")
                setRounds(prevCount => {
                    if (ready) { return prevCount }
                    if (rest && restLength != 0) { return prevCount + 1; }
                    if (restLength === 0) { return prevCount + 1; }
                    else { return prevCount; }
                });
            }
            if (duration === -1 && rounds === intervals && !ready) {
                clearInterval(training);
                setTraining(null);
                setComplete(true);
                setStartTime(null);
            }
        }
        //setAlteringState(false)
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
                setReady(true)
            }
            else {
                setReady(false)
            }
            setDuration(readyLength > 0 ? readyLength - 1 : roundLength - 1);
            setRounds(1);
            setRest(false);
            setComplete(false);
        }
    };

    return (
        <View>
            <TouchableOpacity
                onPress={onPressHandle}
                testID="start-button"
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
                    {!complete && ready &&
                        <View>
                            <Text style={styles.text}>Ready Time Left: {displayTime}</Text>
                        </View>
                    }
                    {!complete && !rest && !ready &&
                        <View>
                            <Text style={styles.text}>Round Time Left: {displayTime}</Text>
                            <Text style={styles.text}>Round: {rounds}</Text>
                        </View>
                    }
                    {!complete && rest && !ready &&
                        <View>
                            <Text style={styles.text}>Rest Time Left: {displayTime}</Text>
                            <Text style={styles.text}>Round: {rounds}</Text>
                        </View>
                    }
                    {complete &&
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