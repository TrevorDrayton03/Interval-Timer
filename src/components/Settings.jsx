import React from "react";
import { Text, View, TouchableOpacity, Modal } from "react-native";
import styles from "../styles/styles";
import darkTheme from "../styles/darkTheme";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import useSettings from "../custom-hooks/useSettings";

const Settings = () => {
  const {
    modalVisible,
    setModalVisible
  } = useSettings()

  return (
    <View style={[styles.trainingTime, darkTheme.onSurface]}>
      <TouchableOpacity onPress={() => setModalVisible(true)} style={{ padding: 15 }}>
        <Icon name={"cogs"} size={40} color="#03DAC6">
        </Icon>
      </TouchableOpacity>
      <Modal
        visible={modalVisible}
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
      </Modal>
    </View >
  )
}

export default Settings