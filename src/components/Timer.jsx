import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Modal, Pressable } from "react-native";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import IncrementDecrementbutton from "./IncrementDecrementButton";
import MinuteSecondPicker from "./MinuteSecondPicker";

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
        <View style={styles.container}>
            <Icon name={icon} size={50} />
            <View style={styles.column}>
                {isDuration && <Modal
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        setModalVisible(!modalVisible);
                    }}
                >
                    <View style={styles.modalcontainer}>
                        <View style={styles.modal}>
                            <Text style={styles.text}>Set Time</Text>
                            <View style={{ flexDirection: "row", alignItems: "center", flex: .4 }}>
                                <MinuteSecondPicker
                                    value={value}
                                    setValue={setValue}
                                ></MinuteSecondPicker>
                            </View>
                            <Pressable
                                onPress={() => setModalVisible(!modalVisible)}
                            >
                                <Text style={styles.okbutton}>OK</Text>
                            </Pressable>
                        </View>
                    </View>
                </Modal>}
                <TouchableOpacity
                    onPress={() => setModalVisible(!modalVisible)}
                >
                    <Text style={{fontSize:20}}>
                        {isDuration == false ? value : displayTime}
                    </Text>
                </TouchableOpacity>
                <Text style={{fontSize:20}}>
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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 20,

    },
    column: {
        flex: 1,
        justifyContent: "center",
        alignItems: "flex-start",
        paddingHorizontal: 10,
    },
    row: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    modal: {
        flex: 1,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        justifyContent: "center",
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    },
    modalcontainer: {
        flex: 1,
    },
    text: {
        fontSize: 30,
    },
    okbutton: {
        borderWidth: 2,
        borderColor: 'gray',
        borderRadius: 15,
        padding: 20,
        fontSize: 30
    },

});

export default Timer;