import React, { useState } from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const IncrementDecrementButtons = ({ count, countSetter, incremental, minValue }) => {
    // interval states are required because without them the clear interval will not clear the current timer properly (it will try to clear a prior version of a timer, even if there isn't one)
    const [plusInterval, setPlusInterval] = useState(null);
    const [minusInterval, setMinusInterval] = useState(null);

    const onPlusPress = () => {
        countSetter(prevCount => prevCount + incremental);
    }
    const onMinusPress = () => {
        if (count > minValue) {
            countSetter(prevCount => prevCount - incremental);
        }
    }

    const handlePlusPressIn = () => {
        setPlusInterval(setInterval(() => countSetter(prevCount => prevCount + incremental), 150));
    };

    const handlePlusPressOut = () => {
        clearInterval(plusInterval);
        setPlusInterval(null);
    };

    const handleMinusPressIn = () => {
        setMinusInterval(setInterval(() => {
            countSetter(prevCount => {
                if (prevCount <= minValue) {
                    clearInterval(minusInterval);
                    return minValue;
                }
                else {
                    return prevCount - incremental;
                }
            });
        }, 150)
        );
    };

    const handleMinusPressOut = () => {
        clearInterval(minusInterval);
        setMinusInterval(null);
    };

    return (
        <View style={styles.buttonRow}>
            <TouchableOpacity
                onPress={onMinusPress}
                onPressIn={handleMinusPressIn}
                onPressOut={handleMinusPressOut}
                style={{ marginRight: 10 }}
            >
                <Icon name="clock-minus-outline" size={50}></Icon>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={onPlusPress}
                onPressIn={handlePlusPressIn}
                onPressOut={handlePlusPressOut}
            >
                <Icon name="clock-plus-outline" size={50}></Icon>
            </TouchableOpacity>
        </View>
    )
};

export default IncrementDecrementButtons;

const styles = StyleSheet.create({
    buttonRow: {
        flexDirection: "row",
        justifyContent: "center",
        //backgroundColor: "#DDDDDD",
        //padding: 0
    }
});