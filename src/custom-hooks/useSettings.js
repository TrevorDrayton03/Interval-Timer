import { useState } from 'react'

const useSettings = (sounds, vibrations) => {
  const [modalVisible, setModalVisible] = useState(false)
  const [isSoundsEnabled, setIsSoundsEnabled] = useState(sounds);
  const [isVibrationsEnabled, setIsVibrationsEnabled] = useState(vibrations);

  const toggleSounds = () => setIsSoundsEnabled((previousState) => !previousState);
  const toggleVibrations = () => setIsVibrationsEnabled((previousState) => !previousState);

  return {
    modalVisible,
    setModalVisible,
    isSoundsEnabled,
    isVibrationsEnabled,
    toggleVibrations,
    toggleSounds
  }
}

export default useSettings
