import React, { useState } from "react";
import { Text, View, TouchableOpacity, TouchableWithoutFeedback, Modal, Pressable } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import IncrementDecrementbutton from "./IncrementDecrementButton";
import MinuteSecondPicker from "./MinuteSecondPicker";
import styles from "../styles/styles";
import darkTheme from "../styles/darkTheme";
import helpers from "../helpers/helpers";
import Icon2 from "react-native-vector-icons/MaterialIcons";

const Timer = ({
  name,
  icon,
  incremental,
  startValue,
  minValue,
  isDuration,
  value,
  setValue,
}) => {
  const [modalVisible, setModalVisible] = useState(false);

  let displayTime = helpers.displayTime(value);

  return (
    <View style={[styles.timerContainer, darkTheme.timerContainer]}>
      <TouchableOpacity
        style={[styles.timerContainer, darkTheme.timerContainer]}
        onPress={() => setModalVisible(!modalVisible)}
        disabled={!isDuration}
      >
        <Icon name={icon} size={50} color={"#BB86FC"} />
        <View style={styles.timerColumn}>
          <Text style={[{ fontSize: 20 }, darkTheme.onSurface]}>
            {isDuration == false ? value : displayTime}
          </Text>
          <Text style={[{ fontSize: 20 }, darkTheme.onSurface]}>{name}</Text>
        </View>
      </TouchableOpacity>
      <IncrementDecrementbutton
        count={value}
        countSetter={setValue}
        incremental={incremental}
        startValue={startValue}
        minValue={minValue}
      ></IncrementDecrementbutton>
      {
        isDuration && (
          <Modal
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              setModalVisible(!modalVisible);
            }}
          >
            <View
              style={[
                styles.timerModalContainer,
                darkTheme.timerModalContainer,
              ]}
            >
              <View style={[styles.timerModal, darkTheme.timerModal]}>
                <Text style={[styles.timerText, darkTheme.onSurface]}>
                  Set {name}
                </Text>
                <View style={styles.timerRow}>
                  <MinuteSecondPicker
                    value={value}
                    setValue={setValue}
                  ></MinuteSecondPicker>
                </View>
                <Pressable onPress={() => setModalVisible(!modalVisible)}>
                  <Text style={[darkTheme.button, styles.button, { width: 75, textAlign: 'center' }]}>
                    OK
                  </Text>
                </Pressable>
              </View>
              <View style={styles.timerBackColumn}>
                <View style={styles.row}>
                  <View style={styles.timerBackButton}>
                    <TouchableOpacity onPress={() => setModalVisible(false)} style={{ padding: 10}} >
                      <Icon2 name={"arrow-back"} size={40} color="#03DAC6" />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          </Modal>
        )
      }
    </View >
  );
};

export default Timer;
