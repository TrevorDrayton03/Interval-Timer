import React from "react";
import {
  Modal,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Icon2 from "react-native-vector-icons/MaterialIcons";
import styles from "../styles/styles";
import darkTheme from "../styles/darkTheme";
import useStoreButton from "../custom-hooks/useStoreButton";

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

  const {
    modalVisible,
    setModalVisible,
    allItems,
    inputModalVisible,
    setInputModalVisible,
    inputText,
    setInputText,
    setItemHandle,
    deleteItemHandle,
  } = useStoreButton(roundLength, restLength, readyLength, intervals)

  return (
    <View>
      <TouchableOpacity onPress={() => setModalVisible(true)} style={{ padding: 10 }}>
        <Icon name={"bookmark-multiple-outline"} size={35} color="#03DAC6" />
      </TouchableOpacity>
      <Modal
        visible={modalVisible}
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <View
          style={[styles.container, darkTheme.storeButtonModalView]}
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
                    placeholder=""
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
              {allItems && Object.keys(allItems).length > 0 ? 
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
                }) : <Text style={[styles.noTimersText, darkTheme.onSurface]}>You have no saved timers. Add a new one by setting the main page and then pressing the "Save Current Timer" button below. Hold down a saved timer to delete one.</Text>}
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
                <TouchableOpacity onPress={() => setModalVisible(false)} style={{ padding: 10 }}>
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
