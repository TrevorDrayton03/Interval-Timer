import React, { useEffect, useState } from "react";
import { Modal, View, Text, TouchableOpacity, Alert } from "react-native";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from "../styles/styles"
import helpers from "../helpers/helpers"

// this file sets on interval for duration when this component's button is pressed and uses useEffects on the duration to manage the states
const FightClock = ({ intervals, restLength, roundLength, readyLength }) => {
    const [duration, setDuration] = useState((readyLength > 0 ? readyLength - 1 : roundLength - 1));
    const [rounds, setRounds] = useState(1);
    const [training, setTraining] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [rest, setRest] = useState(false);
    const [ready, setReady] = useState(false);
    const [complete, setComplete] = useState(false);
    const [count, setCount] = useState(0);

    let displayTime = helpers.displayTime(duration)

    useEffect(() => {
        if (readyLength > 0) {
            setReady(true)
        }
        else {
            setReady(false)
        }
        // count is to check that we only run the ready state once. if count > 0 then ready has been completed
        setCount(0)
    }, [modalVisible, readyLength])

    useEffect(() => {
        setRest(false);
    }, [modalVisible, restLength])

    useEffect(() => {
        setDuration(ready ? readyLength - 1 : roundLength - 1);
        setRounds(1);
        setComplete(false);
    }, [modalVisible, roundLength])

    // manages the ready state, rest state, and the intervals
    useEffect(() => {
        if (ready && duration == roundLength - 1 && count == 1) {
            setReady(false)
        }
        // if it's the top of a new round and it's not the last round then set the rounds
        if ((duration == restLength - 1 || duration == roundLength - 1) && rounds != intervals) {
            // if there is a rest stage and if the ready stage is done and if there duration is not 0
            if (restLength > 0 && ready == false && duration != 0) {
                setRest(!rest);
            }
            setRounds(prevCount => {
                // if it's the ready stage
                if (ready) { return prevCount }
                // if it's a rest stage
                if (rest && restLength != 0) { return prevCount + 1; }
                // if there are no rest stages
                if (restLength === 0) { return prevCount + 1; }
                // otherwise it's the fight stage
                else { return prevCount; }
            });
        }

        if (duration === 0 && rounds === intervals && !ready) {
            clearInterval(training);
            setTraining(null);
            setComplete(true);
            // complete! Completed the training!
        }
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
                    if (prevCount > 0) {
                        return prevCount - 1;
                    }
                    else {
                        if (ready) {
                            //setCount(1)
                            return roundLength - 1;
                        }
                        else if (!rest && restLength > 0) {
                            return restLength - 1;
                        }
                        else {
                            return roundLength - 1;
                        }
                    }
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