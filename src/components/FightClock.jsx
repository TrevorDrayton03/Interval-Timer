import React, { useEffect, useState } from "react";
import { Modal, View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

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

    const formatDuration = (duration) => {
        let seconds = duration % 60;
        let minutes = Math.floor(duration / 60) % 60;
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
        return displayTime
    }

    useEffect(() => {
        if (readyLength > 0) {
            setReady(true)
        }
        else {
            setReady(false)
        }
        setCount(0)
    }, [modalVisible, readyLength])

    // make rest / setRest controlled via useEffect like readyLength (above) and remove restLength checks in code
    // make use effects more cohesive as well

    useEffect(() => {
        setDuration(readyLength > 0 ? readyLength - 1 : roundLength - 1);
        setRounds(1);
        setRest(false);
        setComplete(false);
    }, [modalVisible, roundLength])

    useEffect(() => {
        if (ready && duration == roundLength - 1 && count == 1) {
            setReady(false)
        }
        if ((duration == restLength - 1 || duration == roundLength - 1) && rounds != intervals) {
            if (restLength > 0 && ready == false && duration != 0) {
                setRest(!rest);
            }
            setRounds(prevCount => {
                if (ready) { return prevCount }
                if (rest && restLength != 0) { return prevCount + 1; }
                if (restLength === 0) { return prevCount + 1; }
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
                            setCount(1)
                            return roundLength - 1;
                        }
                        else if (rest && restLength != 0) {
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
                style={{ marginTop: 0, marginBottom: 0 }}
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
                <View style={styles.modalContainer}>
                    {!complete && ready &&
                        <View>
                            <Text style={{ fontSize: 24 }}>Ready Time Left: {formatDuration(duration)}</Text>
                        </View>
                    }
                    {!complete && !rest && !ready &&
                        <View>
                            <Text style={{ fontSize: 24 }}>Round Time Left: {formatDuration(duration)}</Text>
                            <Text style={{ fontSize: 24 }}>Round: {rounds}</Text>
                        </View>
                    }
                    {!complete && rest && !ready &&
                        <View>
                            <Text style={{ fontSize: 24 }}>Rest Time Left: {formatDuration(duration)}</Text>
                            <Text style={{ fontSize: 24 }}>Round: {rounds}</Text>
                        </View>
                    }
                    {complete &&
                        <View>
                            <Text style={{ fontWeight: 'bold', fontSize: 40 }}>DONE!</Text>
                        </View>
                    }
                </View>
            </Modal >
        </View>
    )
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default FightClock;