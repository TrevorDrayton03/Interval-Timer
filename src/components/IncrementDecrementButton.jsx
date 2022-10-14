import React, { useState } from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const IncrementDecrementButtons = (props) => {
    const { count, countSetter, incremental, startVal, minVal } = props;
    const onPlusPress = () => {
        countSetter(prevCount => prevCount + incremental);
    }
    const onMinusPress = () => {
        if (count > minVal) {
            countSetter(prevCount => prevCount - incremental);
        }
        else {
            alert("Minimum value of " + minVal + ".")
        }
    }
    return (
        <View style={styles.buttonRow}>
            <TouchableOpacity
                onPress={onMinusPress}
                style={{ marginRight: 10 }}
            >
                <Icon name="clock-minus-outline" size={50}></Icon>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={onPlusPress}
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