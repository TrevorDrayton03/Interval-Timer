import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";

export const zeroPad = (num) => {
  if (typeof num != typeof String) {
    let numString = num.toString().padStart(2, "0");
    return numString;
  } else {
    let numString = num.padStart(2, "0");
    return numString;
  }
};

export const getDisplayTime = (value) => {
  let seconds = value % 60;
  let minutes = Math.floor(value / 60) % 60;
  let hours = Math.floor(value / 3600);
  seconds = zeroPad(seconds);
  if (hours == 0) {
    var displayTime = minutes + ":" + seconds;
    return displayTime;
  } else {
    minutes = zeroPad(minutes);
    var displayTime = hours + ":" + minutes + ":" + seconds;
    return displayTime;
  }
};

export const setItem = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (e) {
    console.log(e, " @set");
    Alert.alert("setItem", JSON.stringify(e));
  }
};

export const getItem = async (key) => {
  try {
    const getItem = await AsyncStorage.getItem(key);
    return getItem != null ? JSON.parse(getItem) : null;
  } catch (e) {
    console.log(e, " @get");
    Alert.alert("getItem", JSON.stringify(e));
  }
};

export const getMultipleItems = async (keys) => {
  let training;
  try {
    training = await AsyncStorage.multiGet(keys);
    return training != null
      ? training.map((item) => JSON.parse(item[1]))
      : null;
  } catch (e) {
    console.log(e, " @getMultiple");
    Alert.alert("getMultipleItems", JSON.stringify(e));
  }
};

export const deleteItem = async (key) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (e) {
    console.log(e, "@deleteItem");
    Alert.alert("deleteItem", JSON.stringify(e));
  }
};

export const deleteMultipleItems = async (keys) => {
  try {
    await AsyncStorage.multiRemove(keys);
  } catch (e) {
    console.log(e, "@deleteMultipleItems");
    Alert.alert("deleteMultipleItems", JSON.stringify(e));
  }
};

export const updateItem = async (key) => {
  try {
    await AsyncStorage.mergeItem(key);
  } catch (e) {
    console.log(e, " @upd");
    Alert.alert("updateItem", JSON.stringify(e));
  }
};

export const getAllKeys = async () => {
  let keys = [];
  try {
    keys = await AsyncStorage.getAllKeys();
    return keys;
  } catch (e) {
    console.log(e, " @getall");
    Alert.alert("getAllKeys", JSON.stringify(e));
  }
};