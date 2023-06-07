import React, { useState } from "react";
import { Text, View, TouchableOpacity, Modal, Pressable } from "react-native";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import IncrementDecrementbutton from "./IncrementDecrementButton";
import MinuteSecondPicker from "./MinuteSecondPicker";
import styles from "../styles/styles";
import darkTheme from "../styles/darkTheme";
import helpers from "../helpers/helpers";

const Timer = ({ name, icon, incremental, startValue, minValue, isDuration, value, setValue }) => {
    const [modalVisible, setModalVisible] = useState(false);

    let displayTime = helpers.displayTime(value)

    return (
        <View style={[styles.timerContainer, darkTheme.timerContainer]}>
            <Icon name={icon} size={50} color={'#BB86FC'} />
            <View style={styles.timerColumn}>
                {isDuration && <Modal
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        setModalVisible(!modalVisible);
                    }}
                >
                    <View style={[styles.timerModalContainer, darkTheme.timerModalContainer]}>
                        <View style={[styles.timerModal, darkTheme.timerModal]}>
                            <Text style={[styles.timerText, darkTheme.onSurface]}>Set {name}</Text>
                            <View style={styles.timerRow}>
                                <MinuteSecondPicker
                                    value={value}
                                    setValue={setValue}
                                ></MinuteSecondPicker>
                            </View>
                            <Pressable
                                onPress={() => setModalVisible(!modalVisible)}
                            >
                                <Text style={[styles.timerOkButton, darkTheme.button]}>OK</Text>
                            </Pressable>
                        </View>
                    </View>
                </Modal>}
                <TouchableOpacity
                    onPress={() => setModalVisible(!modalVisible)}
                >
                    <Text style={[{ fontSize: 20 }, darkTheme.onSurface]}>
                        {isDuration == false ? value : displayTime}
                    </Text>
                </TouchableOpacity>
                <Text style={[{ fontSize: 20 }, darkTheme.onSurface]}>
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