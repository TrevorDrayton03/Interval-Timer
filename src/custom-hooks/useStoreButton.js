import { useState, useEffect, useCallback } from "react";
import { setItem, getMultipleItems, deleteItem, getAllKeys } from "../../src/helpers/helpers";
import { Alert } from "react-native";

const useStoreButton = (roundLength, restLength, readyLength, intervals) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [allItems, setAllItems] = useState(null);
  const [inputModalVisible, setInputModalVisible] = useState(false);
  const [inputText, setInputText] = useState(null);

  useEffect(() => {
    setAllItemsHandle();
    setInputText(null);
  }, [inputModalVisible]);

  const setItemHandle = useCallback(async (title) => {
    let training = {
      title: title,
      storeRoundLength: roundLength,
      storeRestLength: restLength,
      storeReadyLength: readyLength,
      storeIntervals: intervals,
    };
    training = JSON.stringify(training);
    await setItem(title, training);
    await setAllItemsHandle();
  }, [roundLength, restLength, readyLength, intervals]);

  const setAllItemsHandle = useCallback(async () => {
    const keys = await getAllKeys();
    setAllItems(await getMultipleItems(keys));
  }, []);

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
            deleteItem(key);
            await setAllItemsHandle(setAllItems);
          },
        },
      ],
      { cancelable: false }
    );
  }, []);

  const deleteAllItemsHandle = useCallback(async () => {
    const keys = await getAllKeys();
    setAllItems(await deleteMultipleItems(keys));
  }, []);

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
    deleteAllItemsHandle
  }
}

export default useStoreButton