import React, { useState } from "react";
import { View, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { styles } from "../styles/styles";
import useIncrementDecrementButton from "../custom-hooks/useIncrementDecrementButton";

const IncrementDecrementButtons = ({
  count,
  countSetter,
  incremental,
  minValue,
}) => {

  const {
    onPlusPress,
    onMinusPress,
    handlePlusPressIn,
    handlePlusPressOut,
    handleMinusPressIn,
    handleMinusPressOut,
  } = useIncrementDecrementButton(count, countSetter, incremental, minValue)

  return (
    <View style={styles.incButtonRow}>
      <TouchableOpacity
        onPress={onMinusPress}
        onPressIn={handleMinusPressIn}
        onPressOut={handleMinusPressOut}
        style={styles.incButton}
      >
        <Icon name="minus" size={50} color="#BB86FC"></Icon>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={onPlusPress}
        onPressIn={handlePlusPressIn}
        onPressOut={handlePlusPressOut}
      >
        <Icon name="plus" size={50} color="#BB86FC"></Icon>
      </TouchableOpacity>
    </View>
  );
};

export default IncrementDecrementButtons;
