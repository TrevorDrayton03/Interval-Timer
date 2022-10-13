import React, { useState } from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const IncrementDecrementButtons = (props) => {
    const { count, countChanger } = props;
    const onPlusPress = () => {
        countChanger(prevCount => prevCount + 1);
    }
    const onMinusPress = () => {
        if (count != 0) {
            countChanger(prevCount => prevCount - 1);
        }
    }
    return (
        <View style={styles.buttonRow}>
            <TouchableOpacity onPress={onMinusPress} style={{ marginRight: 10 }}>
                <Icon name="clock-minus-outline" size={50}></Icon>
            </TouchableOpacity>
            <TouchableOpacity onPress={onPlusPress}>
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