import React, { useEffect, useState } from "react";
import { Modal, View, Text, TouchableOpacity, Alert, AppState } from "react-native";
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
    const [rest, setRest] = useState(false);
    const [ready, setReady] = useState(false);
    const [complete, setComplete] = useState(false);
    const [appState, setAppState] = useState(AppState.currentState);
    const [stopTime, setStopTime] = useState(null);


    let displayTime = helpers.displayTime(duration)

    const handleAppStateChange = (nextAppState) => {
        console.log('App State: ' + nextAppState);
        if (appState === 'active' && nextAppState.match(/inactive|background/)) {
            setStopTime(Date.now())
            console.log('App State: ' + 'App has come to the background!');
            console.log(Date.now());
        }
        setAppState(nextAppState);
    };

    useEffect(() => {
        subscription = AppState.addEventListener('change', handleAppStateChange);
        return () => {
            subscription.remove()
        };
    }, []);
    useEffect(() => {
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
    }, [modalVisible, roundLength])
    useEffect(() => {
        if (rest) {
            setDuration(restLength > 0 ? restLength - 1 : roundLength - 1);
        } else {
            setDuration(roundLength - 1);
        }
    }, [rest]);
    useEffect(() => {
        if (!ready) {
            setDuration(roundLength - 1);
        } else {
            setDuration(readyLength - 1)
        }
    }, [ready]);
    // manages if there is multiple rounds with no rest
    useEffect(() => {
        if (!rest && !ready) {
            setDuration(roundLength - 1);
        }
    }, [rounds]);
    // the key to getting the FightClock to work as intended is having this use effect trigger the above use effects [rest, ready, rounds]
    // otherwise, there is one too many steps in the interval that could not be avoided
    useEffect(() => {
        if (stopTime !== null) { // if the timer has been stopped before
            const elapsedTime = Math.floor((Date.now() - stopTime) / 1000); // calculate the elapsed time in seconds
            const remainingTime = duration - elapsedTime; // calculate the remaining time
            if (remainingTime > 0) { // if there is remaining time
                setDuration(remainingTime); // update the duration state variable
            } else { // if there is no remaining time
                setDuration(roundLength - 1); // reset the duration state variable
            }
        }
        if (ready && duration == -1 && rounds == 1) {
            setReady(false)
        }
        if (duration == -1 && rounds != intervals) {
            if (restLength > 0 && ready == false) {
                setRest(!rest);
            }
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
        }
        setStopTime(null); // reset the stopTime state variable
    }, [duration]);

    const onPressHandle = () => {
        if (roundLength == 0) {
            Alert.alert(
                'Warning',
                'Round length is 0!'
            )
        } else {
            setModalVisible(true);
            setTraining(setInterval(() => {
                setDuration(prevCount => {
                    return prevCount - 1;
                });
            }, 1000));
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