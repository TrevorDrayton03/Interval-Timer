import { useState } from 'react'

const useSettings = (settings, setSettings) => {
  const [modalVisible, setModalVisible] = useState(false)

  console.log(settings)

  const toggleSounds = () => { setSettings((previousState) => ({ ...previousState, soundSetting: !previousState.soundSetting })) };
  const toggleVibrations = () => { setSettings((previousState) => ({ ...previousState, vibrationSetting: !previousState.vibrationSetting })) };

  let isSoundsEnabled = settings.soundSetting
  let isVibrationsEnabled = settings.vibrationSetting

  return {
    modalVisible,
    setModalVisible,
    toggleVibrations,
    toggleSounds,
    isSoundsEnabled,
    isVibrationsEnabled,
  }
}

export default useSettings
