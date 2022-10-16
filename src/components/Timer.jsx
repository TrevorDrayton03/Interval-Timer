import React, { useState } from "react";
import { StyleSheet, Text, View, Button, TouchableOpacity } from "react-native";
import { Dimensions } from "react-native";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import IncrementDecrementbutton from "./IncrementDecrementButton";

var { height, width } = Dimensions.get('window');

const Timer = (props) => {
    const { name, icon, incremental, startVal, minVal, isDuration, value, setValue } = props;
    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('time');
    const [show, setShow] = useState(false);

    const zeroPad = (num) => {
        let numString = num.toString().padStart(2, "0");
        return numString;
    }

    if (isDuration) {
        var seconds = value % 60;
        var minutes = Math.floor(value / 60) % 60;
        var hours = Math.floor(minutes / 60) % 24;
        minutes = zeroPad(minutes);
        seconds = zeroPad(seconds);
        if (hours == 0) {
            var time = minutes + ":" + seconds;
        }
        else {
            var time = hours + ":" + minutes + ":" + seconds;
        }
    }

    return (
        <View style={styles.timerContainer}>
            <View style={styles.row}>
                <Icon name={icon} size={50} />
                <View style={styles.column}>
                    <TouchableOpacity
                        onPress={null}
                    //activeOpacity={100}
                    >
                        <Text>
                            {isDuration == false ? value : time}
                        </Text>
                    </TouchableOpacity>
                    <Text>
                        {name}
                    </Text>
                </View>
                <View style={styles.buttonColumn}>
                    <IncrementDecrementbutton
                        count={value}
                        countSetter={setValue}
                        incremental={incremental}
                        startVal={startVal}
                        minVal={minVal}
                    >
                    </IncrementDecrementbutton>
                </View>
            </View>
        </View >
    )
};

const styles = StyleSheet.create({
    timerContainer: {
        //flex: 0,
        width: width,
        height: height / 7,
        justifyContent: "center",
        paddingHorizontal: 10
    },
    row: {
        flexDirection: "row",
        width: width,
        justifyContent: "space-between",
        paddingHorizontal: 20,
        marginTop: 20,
    },
    column: {
        //flexDirection: "column", //this appears to be implied
        flex: 1,
        //width: width,
        justifyContent: "center",
        paddingHorizontal: 10,
        //marginTop: 20,
    },
    buttonColumn: {
        //flexDirection: "column", //this appears to be implied
        flex: 1,
        //width: width,
        justifyContent: "center",
        paddingHorizontal: 10,
        //marginTop: 20,
    },
});

export default Timer;