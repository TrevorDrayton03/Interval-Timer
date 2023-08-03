import React from "react"
import { Text, View, TouchableOpacity, Modal, Switch } from "react-native"
import styles from "../styles/styles"
import darkTheme from "../styles/darkTheme"
import Icon from "react-native-vector-icons/MaterialCommunityIcons"
import Icon2 from "react-native-vector-icons/MaterialIcons"
import useSettings from "../custom-hooks/useSettings"
import { useSettingsContext } from '../contexts/SettingsContext'

const Settings = () => {
  const { settings, setSettings } = useSettingsContext()

  const {
    modalVisible,
    setModalVisible,
    isSoundsEnabled,
    isVibrationsEnabled,
    toggleVibrations,
    toggleSounds
  } = useSettings(settings, setSettings)

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
        <View style={[styles.container, darkTheme.storeButtonModalView]}>
          <View style={styles.settingsRow}>
            <Text style={[darkTheme.onSurface, { fontSize: 26 }]}>
              Sounds
            </Text>
            <Switch
              trackColor={{ false: '#767577', true: '#BB86FC80' }}
              thumbColor={isSoundsEnabled ? '#BB86FC' : '#f4f3f4'}
              // ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSounds}
              value={isSoundsEnabled}
              style={{ transform: [{ scaleX: 1.3 }, { scaleY: 1.3 }] }}
            />
          </View>
          <View style={styles.settingsRow}>
            <Text style={[darkTheme.onSurface, { fontSize: 26 }]}>
              Vibrations
            </Text>
            <Switch
              trackColor={{ false: '#767577', true: '#BB86FC80' }}
              thumbColor={isVibrationsEnabled ? '#BB86FC' : '#f4f3f4'}
              // ios_backgroundColor="#3e3e3e"
              onValueChange={toggleVibrations}
              value={isVibrationsEnabled}
              style={{ transform: [{ scaleX: 1.3 }, { scaleY: 1.3 }] }}
            />
          </View>
          <View style={styles.settingsBackButton}>
            <View style={styles.row}>
              <View style={styles.backButton}>
                <TouchableOpacity onPress={() => setModalVisible(false)} style={{ padding: 10 }}>
                  <Icon2 name={"arrow-back"} size={40} color="#03DAC6" />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </Modal >
    </View >
  )
}

export default Settings