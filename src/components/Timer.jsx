import React, { useState } from "react";
import { Text, View, TouchableOpacity, Modal, Pressable } from "react-native";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import IncrementDecrementbutton from "./IncrementDecrementButton";
import MinuteSecondPicker from "./MinuteSecondPicker";
import styles from "../styles/styles"
import helpers from "../helpers/helpers"


const Timer = ({ name, icon, incremental, startValue, minValue, isDuration, value, setValue }) => {
    const [modalVisible, setModalVisible] = useState(false);

    let displayTime = helpers.displayTime(value)

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
                    <Text style={styles.text}>
                        {isDuration == false ? value : displayTime}
                    </Text>
                </TouchableOpacity>
                <Text style={styles.text}>
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