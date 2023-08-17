import React, { createContext, useContext, useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

const defaultSettings = {
  soundSetting: true,
  vibrationSetting: true,
  millisecondSetting: false,
  roundSetting: true,
}

const SettingsContext = createContext(defaultSettings)

export const loadSettingsFromStorage = async () => {
  try {
    const storedSettings = await AsyncStorage.getItem('appSettings')
    if (storedSettings !== null) {
      return JSON.parse(storedSettings)
    }
  } catch (error) {
    console.error('Error loading settings from storage:', error)
  }
  return defaultSettings
}

export const saveSettingsToStorage = async (settings) => {
  try {
    await AsyncStorage.setItem('appSettings', JSON.stringify(settings))
  } catch (error) {
    console.error('Error saving settings to storage:', error)
  }
}

export const SettingsProvider = ({ children }) => {
  const [settings, setSettings] = useState(defaultSettings)

  useEffect(() => {
    loadSettingsFromStorage().then((loadedSettings) => {
      setSettings(loadedSettings)
    })
  }, [])

  useEffect(() => {
    saveSettingsToStorage(settings)
  }, [settings])

  return (
    <SettingsContext.Provider value={{ settings, setSettings }}>
      {children}
    </SettingsContext.Provider>
  )
}

export const useSettingsContext = () => {
  const context = useContext(SettingsContext)
  if (!context) {
    throw new Error('useSettings must be used within a SettingsProvider')
  }
  return context
}