import React, { useEffect, useState } from "react";
import { Modal, View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// 1. I want a pause button that pauses the interval and reveals a stop button to end the training.
// 2. I want a 5 second get ready time.

const FightClock = ({ intervals, restLength, roundLength }) => {
    const [duration, setDuration] = useState(roundLength);
    const [rounds, setRounds] = useState(1);
    const [training, setTraining] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [rest, setRest] = useState(false);
    const [complete, setComplete] = useState(false);

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
        setDuration(roundLength - 1);
        setRounds(1);
        setRest(false);
        setComplete(false);
    }, [modalVisible, roundLength])

    useEffect(() => {
        // if (duration == 0) {
        if ((duration == restLength - 1 || duration == roundLength - 1) && rounds != intervals) {
            if (restLength > 0) {
                setRest(!rest);
            }
            setRounds(prevCount => {
                if (rest && restLength != 0) { return prevCount + 1; }
                if (restLength === 0) { return prevCount + 1; }
                else { return prevCount; }
            });
        }

        if (duration === 0 && rounds === intervals) {
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
                    if (prevCount > 0) { return prevCount - 1; }
                    else {
                        if (rest && restLength != 0) { return restLength - 1; } // will toggle a change in rest state
                        else { return roundLength - 1; } // will toggle a change in rest state
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
                animationType="slide"
                onRequestClose={() => {
                    setModalVisible(false);
                    clearInterval(training);
                    setTraining(null);
                }}
            >
                <View style={styles.modalContainer}>
                    {!complete && !rest &&
                        <View>
                            <Text>Round Time Left: {formatDuration(duration)}</Text>
                            <Text>Round: {rounds}</Text>
                        </View>
                    }
                    {!complete && rest &&
                        <View>
                            <Text>Rest Time Left: {formatDuration(duration)}</Text>
                            <Text>Round: {rounds}</Text>
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