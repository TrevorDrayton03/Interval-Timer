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
    const [startTime, setStartTime] = useState(null);
    //const [totalDuration, setTotalDuration] = useState(roundLength * intervals + restLength * (intervals - 1) + readyLength)

    let totalDuration = roundLength * intervals + restLength * (intervals - 1) + readyLength;
    let displayTime = helpers.displayTime(duration)

    const handleAppStateChange = (nextAppState) => {
        console.log("handleAppStateChange")
        if (appState === 'active' && nextAppState.match(/inactive|background/)) {
            setStopTime(Date.now())
        }
        setAppState(nextAppState);
    };

    // instantiate an event listener for appstate changes upon component creation
    useEffect(() => {
        console.log("appstate event listeer")
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
        console.log("rest useEffect")
        if (rest) {
            setDuration(restLength > 0 ? restLength - 1 : roundLength - 1);
        } else {
            setDuration(roundLength - 1);
        }
    }, [rest]);

    useEffect(() => {
        console.log("ready useEffect")
        if (!ready) {
            setDuration(roundLength - 1);
        } else {
            setDuration(readyLength - 1)
        }
    }, [ready]);

    // manages if there is multiple rounds with no rest
    useEffect(() => {
        console.log("rounds useEffect")
        if (!rest && !ready) {
            setDuration(roundLength - 1);
        }
    }, [rounds]);

    // the key to getting the FightClock to work as intended is having this use effect trigger the above use effects [rest, ready, rounds]
    // otherwise, there is one too many steps in the interval that could not be avoided
    useEffect(() => {
        console.log("duration useEffect")
        if (stopTime !== null) {
            console.log("appState useEffect stopTime not null")
            //const offSet = stopTime - startTime; 
            //const elapsedTime = Date.now() - stopTime;
            //const currentTime = Math.floor((offSet + elapsedTime) / 1000);
            const currentTime = Math.floor((Date.now() - startTime) / 1000);
            const remainingTime = totalDuration - currentTime;
            //////////////////////////////////////////////// TIME REMAINING ///////////////////////////////////////////////////////////
            // if the timer is not done
            if (remainingTime > 0) {
                // if should be in ready state
                if (currentTime < readyLength) {
                    //setReady(true); should already be set this way
                    //setRest(false); should already be set this way
                    console.log(totalDuration, " totalDuration")
                    console.log(remainingTime, " remainingTime")
                    console.log(readyLength, " readyLength")
                    console.log(currentTime)
                    console.log(readyLength - currentTime, "ready length duration")
                    setDuration(readyLength - currentTime);
                }
                // if should be in round or rest state
                else {
                    setReady(false);
                    // do logic with remaining duration to determine which state the app needs to be in 
                    const timeline = [];
                    for (var i = 1; i <= intervals; i++) {
                        let ti_1 = (roundLength * i + restLength * (i - 1) + readyLength)
                        let ti_2 = (roundLength * i + restLength * i + readyLength)
                        if (i != intervals) {
                            timeline.push(ti_1, ti_2)
                        }
                        else {
                            timeline.push(ti_1)
                        }
                    }
                    console.log(timeline)
                    // loop through timeline to determine where current time stands
                    for (var i = 0; i < timeline.length; i++) {
                        // round
                        if (i % 2 == 1) {
                            setRest(false)
                        }
                        // rest
                        else {
                            setRest(true)
                        }
                    }
                }
            }
            //////////////////////////////////////////////// TIME REMAINING ///////////////////////////////////////////////////////////
            /////////////////////////////////////////////////// NO TIME REMAINING /////////////////////////////////////////////////////
            else {
                clearInterval(training);
                setTraining(null);
                setComplete(true) // reset the duration state variable
            }
            /////////////////////////////////////////////////// NO TIME REMAINING /////////////////////////////////////////////////////
        }
        setStopTime(null); // reset the stopTime state variable
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
            setStartTime(null);
        }

    }, [duration]);

    // useEffect(() => {
    //     console.log("appState useEffect")
    //     // if Date.now() has been stored, which occurs in the appstate listener when app is in background
    //     if (stopTime !== null) {
    //         console.log("appState useEffect stopTime not null")
    //         //const offSet = stopTime - startTime; 
    //         //const elapsedTime = Date.now() - stopTime;
    //         //const currentTime = Math.floor((offSet + elapsedTime) / 1000);
    //         const currentTime = Math.floor((Date.now() - startTime) / 1000);
    //         const remainingTime = totalDuration - currentTime;
    //         //////////////////////////////////////////////// TIME REMAINING ///////////////////////////////////////////////////////////
    //         // if the timer is not done
    //         if (remainingTime > 0) {
    //             // if should be in ready state
    //             if (currentTime < readyLength) {
    //                 //setReady(true); should already be set this way
    //                 //setRest(false); should already be set this way
    //                 console.log(totalDuration, " totalDuration")
    //                 console.log(remainingTime, " remainingTime")
    //                 console.log(readyLength, " readyLength")
    //                 console.log(currentTime)
    //                 console.log(readyLength - currentTime, "ready length duration")
    //                 setDuration(readyLength - currentTime);
    //             }
    //             // if should be in round or rest state
    //             else {
    //                 setReady(false);
    //                 // do logic with remaining duration to determine which state the app needs to be in 
    //                 const timeline = [];
    //                 for (var i = 1; i <= intervals; i++) {
    //                     let ti_1 = (roundLength * i + restLength * (i - 1) + readyLength)
    //                     let ti_2 = (roundLength * i + restLength * i + readyLength)
    //                     if (i != intervals) {
    //                         timeline.push(ti_1, ti_2)
    //                     }
    //                     else {
    //                         timeline.push(ti_1)
    //                     }
    //                 }
    //                 console.log(timeline)
    //                 // loop through timeline to determine where current time stands
    //                 for (var i = 0; i < timeline.length; i++) {
    //                     // round
    //                     if (i % 2 == 1) {
    //                         setRest(false)
    //                     }
    //                     // rest
    //                     else {
    //                         setRest(true)
    //                     }
    //                 }
    //             }
    //         }
    //         //////////////////////////////////////////////// TIME REMAINING ///////////////////////////////////////////////////////////
    //         /////////////////////////////////////////////////// NO TIME REMAINING /////////////////////////////////////////////////////
    //         else {
    //             clearInterval(training);
    //             setTraining(null);
    //             setComplete(true) // reset the duration state variable
    //         }
    //         /////////////////////////////////////////////////// NO TIME REMAINING /////////////////////////////////////////////////////
    //     }
    //     setStopTime(null); // reset the stopTime state variable
    // }, [appState])

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