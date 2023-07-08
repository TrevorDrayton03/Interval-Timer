import React, { useState, useEffect } from "react";
import {
  Modal,
  Text,
  View,
  TouchableOpacity,
  Alert,
  TextInput,
  ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Icon2 from "react-native-vector-icons/MaterialIcons";
import styles from "../styles/styles";
import darkTheme from "../styles/darkTheme";
import helpers from "../helpers/helpers";

const StoreButton = ({
  roundLength,
  restLength,
  intervals,
  readyLength,
  setRoundLength,
  setRestLength,
  setIntervals,
  setReadyLength,
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [allItems, setAllItems] = useState(null);
  const [inputModalVisible, setInputModalVisible] = useState(false);
  const [inputText, setInputText] = useState(null);

  useEffect(() => {
    setAllItemsHandle();
    setInputText(null);
  }, [inputModalVisible]);

  const setItemHandle = async (title) => {
    let training = {
      title: title,
      storeRoundLength: roundLength,
      storeRestLength: restLength,
      storeReadyLength: readyLength,
      storeIntervals: intervals,
    };
    training = JSON.stringify(training);
    await helpers.setItem(title, training);
    await setAllItemsHandle();
  };

  const setAllItemsHandle = async () => {
    const keys = await helpers.getAllKeys();
    setAllItems(await helpers.getMultipleItems(keys));
  };

  const deleteItemHandle = async (key) => {
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
            helpers.deleteItem(key);
            await setAllItemsHandle(setAllItems);
          },
        },
      ],
      { cancelable: false }
    );
  };

  const deleteAllItemsHandle = async () => {
    const keys = await helpers.getAllKeys();
    setAllItems(await helpers.deleteMultipleItems(keys));
  };

  return (
    <View>
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <Icon name={"bookmark-multiple-outline"} size={30} color="#03DAC6" />
      </TouchableOpacity>
      <Modal
        visible={modalVisible}
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <View
          style={[styles.storeButtonModalView, darkTheme.storeButtonModalView]}
        >
          {
            <Modal
              visible={inputModalVisible}
              animationType="none"
              onRequestClose={() => setInputModalVisible(false)}
            >
              <View
                style={[
                  styles.storeButtonInputModalContainer,
                  darkTheme.storeButtonInputModalContainer,
                ]}
              >
                <Text
                  style={[
                    styles.storeButtonInputModalTitle,
                    darkTheme.onSurface,
                  ]}
                >
                  Save Timer
                </Text>
                <View style={[styles.storeButtonTextInputContainer, darkTheme.surface]}>
                  <TextInput
                    onChangeText={setInputText}
                    placeholder="Name"
                    maxLength={50}
                    numberOfLines={2}
                    style={[styles.storeButtonTextInput, darkTheme.onSurface]}
                    placeholderTextColor="#CCCCCC"
                  >
                  </TextInput>
                </View>
                <View style={styles.storeButtonButtonInputContainer}>
                  <TouchableOpacity
                    onPress={() => {
                      setItemHandle(inputText);
                      setInputModalVisible(false);
                    }}
                    style={[styles.button, darkTheme.button, { width: 75 }]}
                  >
                    <Text style={darkTheme.onPrimary}>OK</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => setInputModalVisible(false)}
                    style={[styles.button, darkTheme.button, { width: 75 }]}
                  >
                    <Text style={darkTheme.onPrimary}>Cancel</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>
          }
          <View style={styles.storeButtonModalContainer}>
            <View style={styles.storeButtonRowContainer}>
              <Text style={[styles.storeButtonRow1, darkTheme.onSurface]}>
                Name
              </Text>
              <Text style={[styles.storeButtonRow2, darkTheme.onSurface]}>
                Round
              </Text>
              <Text style={[styles.storeButtonRow2, darkTheme.onSurface]}>
                Rest
              </Text>
              <Text style={[styles.storeButtonRow2, darkTheme.onSurface]}>
                Ready
              </Text>
              <Text style={[styles.storeButtonRow3, darkTheme.onSurface]}>
                Interval
              </Text>
            </View>
            <View style={styles.storeButtonRowContainer}>
              <View
                style={[
                  // styles.storeButtonBlackBar1,
                  { backgroundColor: "white" },
                ]}
              />
            </View>
            <ScrollView style={[styles.storeButtonScrollView, darkTheme.storeButtonScrollView]}>
              {allItems &&
                allItems.map((item, index) => {
                  return (
                    <TouchableOpacity
                      key={index}
                      onPress={() => {
                        setRoundLength(item.storeRoundLength);
                        setRestLength(item.storeRestLength);
                        setReadyLength(item.storeReadyLength);
                        setIntervals(item.storeIntervals);
                        setModalVisible(false);
                      }}
                      onLongPress={() => {
                        deleteItemHandle(item.title);
                      }}
                    >
                      <View style={styles.storeButtonColumnContainer}>
                        <View style={styles.storeButtonRowContainer}>
                          <Text style={[styles.storeButtonRow4, darkTheme.onSurface]}>
                            {item.title}
                          </Text>
                          <Text style={[styles.storeButtonRow5, darkTheme.onSurface]}>
                            {item.storeRoundLength}
                          </Text>
                          <Text style={[styles.storeButtonRow5, darkTheme.onSurface]}>
                            {item.storeRestLength}
                          </Text>
                          <Text style={[styles.storeButtonRow5, darkTheme.onSurface]}>
                            {item.storeReadyLength}
                          </Text>
                          <Text style={[styles.storeButtonRow4, darkTheme.onSurface]}>
                            {item.storeIntervals}
                          </Text>
                        </View>
                        <View style={styles.storeButtonRowContainer}>
                          {/* <View style={styles.storeButtonBlackBar2} /> */}
                        </View>
                      </View>
                    </TouchableOpacity>
                  );
                })}
            </ScrollView>
          </View>
          <View style={styles.saveCurrentTimer}>
            <TouchableOpacity
              onPress={() => setInputModalVisible(true)}
              style={[styles.button, darkTheme.button]}
            >
              <Text style={darkTheme.onPrimary}>Save Current Timer</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.columnStoreButton}>
            <View style={styles.row}>
              <View style={styles.backButton}>
                <TouchableOpacity onPress={() => setModalVisible(false)}>
                  <Icon2 name={"arrow-back"} size={40} color="#03DAC6" />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default StoreButton;
