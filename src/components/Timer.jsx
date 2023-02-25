import React, { useState } from "react";
import { Text, View, TouchableOpacity, Modal, Pressable } from "react-native";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import IncrementDecrementbutton from "./IncrementDecrementButton";
import MinuteSecondPicker from "./MinuteSecondPicker";
import { styles } from "../styles/styles"

const Timer = ({ name, icon, incremental, startValue, minValue, isDuration, value, setValue }) => {
    const [modalVisible, setModalVisible] = useState(false);

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

    if (isDuration) {
        let seconds = value % 60;
        let minutes = Math.floor(value / 60) % 60;
        let hours = Math.floor(minutes / 60) % 24;
        minutes = zeroPad(minutes);
        seconds = zeroPad(seconds);
        if (hours == 0) {
            var displayTime = minutes + ":" + seconds;
        }
        else {
            var displayTime = hours + ":" + minutes + ":" + seconds;
        }
    }

    return (
        <View style={styles.timerContainer}>
            <Icon name={icon} size={50} />
            <View style={styles.timerColumn}>
                {isDuration && <Modal
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        setModalVisible(!modalVisible);
                    }}
                >
                    <View style={styles.timerModalContainer}>
                        <View style={styles.timerModal}>
                            <Text style={styles.timerText}>Set {name}</Text>
                            <View style={styles.timerRow}>
                                <MinuteSecondPicker
                                    value={value}
                                    setValue={setValue}
                                ></MinuteSecondPicker>
                            </View>
                            <Pressable
                                onPress={() => setModalVisible(!modalVisible)}
                            >
                                <Text style={styles.timerOkButton}>OK</Text>
                            </Pressable>
                        </View>
                    </View>
                </Modal>}
                <TouchableOpacity
                    onPress={() => setModalVisible(!modalVisible)}
                >
                    <Text style={{ fontSize: 20 }}>
                        {isDuration == false ? value : displayTime}
                    </Text>
                </TouchableOpacity>
                <Text style={{ fontSize: 20 }}>
                    {name}
                </Text>
            </View>
            <IncrementDecrementbutton
                count={value}
                countSetter={setValue}
                incremental={incremental}
                startValue={startValue}
                minValue={minValue}
            >
            </IncrementDecrementbutton>
        </View>
    )
};


export default Timer;