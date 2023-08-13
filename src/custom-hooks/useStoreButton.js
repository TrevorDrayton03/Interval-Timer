import { useState, useEffect, useCallback } from "react"
import { setItem, getMultipleItems, deleteItem, getAllKeys, deleteMultipleItems } from "../../src/helpers/helpers"
import { Alert } from "react-native"

const useStoreButton = (roundLength, restLength, readyLength, intervals) => {
  const [modalVisible, setModalVisible] = useState(false)
  const [allItems, setAllItems] = useState(null)
  const [inputModalVisible, setInputModalVisible] = useState(false)
  const [inputText, setInputText] = useState("TEST")

  useEffect(() => {
    setAllItemsHandle()
    setInputText("TEST")
  }, [inputModalVisible])

  const setItemHandle = (async (name) => {
    let training = {
      title: name,
      storeRoundLength: roundLength,
      storeRestLength: restLength,
      storeReadyLength: readyLength,
      storeIntervals: intervals,
    }
    training = JSON.stringify(training)
    await setItem(name, training)
    await setAllItemsHandle()
  })

  const setAllItemsHandle = (async () => {
    let keys = await getAllKeys()
    keys = keys.filter((key) => key !== "appSettings")
    setAllItems(await getMultipleItems(keys))
  })

  const deleteItemHandle = useCallback(async (key) => {
    Alert.alert(
      "Delete",
      "Are you sure you want to delete " + key + "?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: async () => {
            deleteItem(key)
            await setAllItemsHandle(setAllItems)
          },
        },
      ],
      { cancelable: false }
    )
  }, [])

  // const deleteAllItemsHandle = useCallback(async () => {
  //   const keys = await getAllKeys()
  //   setAllItems(await deleteMultipleItems(keys))
  // }, [])

  return {
    modalVisible,
    setModalVisible,
    allItems,
    inputModalVisible,
    setInputModalVisible,
    inputText,
    setInputText,
    setItemHandle,
    deleteItemHandle,
    // deleteAllItemsHandle
  }
}

export default useStoreButton