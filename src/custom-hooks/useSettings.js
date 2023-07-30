import React, { createContext, useContext, useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

const useSettings = () => {
  const [modalVisible, setModalVisible] = useState(false)

  return {
    modalVisible,
    setModalVisible
  }

}

export default useSettings
