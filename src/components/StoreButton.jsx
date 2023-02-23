import React, { useState, useEffect } from "react";
import { Modal, Button, Text, View, TouchableOpacity, Alert, StyleSheet, TextInput, ScrollView } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const StoreButton = ({ roundLength, restLength, intervals, setRoundLength, setRestLength, setIntervals }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [allItems, setAllItems] = useState(null);
    const [inputModalVisible, setInputModalVisible] = useState(false);
    const [inputText, setInputText] = useState(null);


    const setItem = async (title) => {
        let training = {
            "title": title,
            "storeRoundLength": roundLength,
            "storeRestLength": restLength,
            "storeIntervals": intervals
        }
        try {
            training = JSON.stringify(training);
            await AsyncStorage.setItem(title, training);
            //setInputModalVisible(false);
        }
        catch (e) {
            console.log(e, " @set");
            Alert.alert(
                'setItem',
                JSON.stringify(e)
            )
        }
    }

    const getItem = async (key) => {
        try {
            const getItem = await AsyncStorage.getItem(key);
            return getItem != null ? JSON.parse(getItem) : null;
        }
        catch (e) {
            console.log(e, " @get");
            Alert.alert(
                'getItem',
                JSON.stringify(e)
            )
        }
    }

    const getMultipleItems = async (keys) => {
        let training
        try {
            training = await AsyncStorage.multiGet(keys)
            return training != null ? training.map(item => JSON.parse(item[1])) : null;
        } catch (e) {
            console.log(e, " @getMultiple");
            Alert.alert(
                'getMultipleItems',
                JSON.stringify(e)
            )
        }
    }

    const deleteItem = async (key) => {
        try {
            await AsyncStorage.removeItem(key);
        }
        catch (e) {
            console.log(e, '@deleteItem');
            Alert.alert(
                'deleteItem',
                JSON.stringify(e)
            )
        }
    }

    const deleteMultipleItems = async (keys) => {
        try {
            await AsyncStorage.multiRemove(keys);
        }
        catch (e) {
            console.log(e, '@deleteMultipleItems');
            Alert.alert(
                'deleteMultipleItems',
                JSON.stringify(e)
            )
        }
    }

    const updateItem = async () => {
        try {
            await AsyncStorage.mergeItem('trainingNameHere');
            console.log("Done updateItem");
        }
        catch (e) {
            console.log(e, " @upd");
            Alert.alert(
                'updateItem',
                JSON.stringify(e)
            )
        }
    }
    const getAllKeys = async () => {
        let keys = []
        try {
            keys = await AsyncStorage.getAllKeys();
            return keys;
        }
        catch (e) {
            console.log(e, ' @getall');
            Alert.alert(
                'getAllKeys',
                JSON.stringify(e)
            )
        }
    }

    // const addTrainingHandle = async () => {
    //     setInputModalVisible(true);
    // }

    // const addTrainingHandle = async () => {
    //     try {
    //         await setItem("This Is Titlef");
    //         // const training = await getItem();
    //         // setRoundLength(training.storeRoundLength);
    //         // setRestLength(training.storeRestLength);
    //         // setIntervals(training.storeIntervals);
    //         // return getItem("This Is Titlef");
    //     } catch (e) {
    //         console.log(e, " @addTrainingHandle")
    //         Alert.alert(
    //             'addTrainingHandle',
    //             JSON.stringify(e)
    //         )
    //     }
    // }

    const getAllItemsHandle = async () => {
        try {
            const keys = await getAllKeys()
            setAllItems(await getMultipleItems(keys));
        } catch (e) {
            console.log(e, " @getAllItemsHandle")
            Alert.alert(
                'getAllItemsHandle',
                JSON.stringify(e)
            )
        }
    }

    const deleteAllItemsHandle = async () => {
        try {
            const keys = await getAllKeys()
            setAllItems(await deleteMultipleItems(keys));
        } catch (e) {
            console.log(e, " @getAllItemsHandle")
            Alert.alert(
                'deleteAllItemsHandle',
                JSON.stringify(e)
            )
        }
    }

    const handleOnLongPress = async () => {

    }

    return (
        <View>
            <TouchableOpacity
                onPress={() => setModalVisible(true)}
            >
                <Icon
                    name={'arrange-bring-forward'} size={30}
                />
            </TouchableOpacity>
            <Modal
                visible={modalVisible}
                animationType="fade"
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={{ flex: .95 }}>
                    {
                        <Modal
                            visible={inputModalVisible}
                            animationType="none"
                            onRequestClose={() => setInputModalVisible(false)}
                        >
                            <View style={{ flex: 1, justifyContent: "center" }}>
                                <Text style={{ textAlign: "center", padding: 10 }}>Store Current Settings</Text>
                                <View style={styles.textinput}>
                                    <TextInput
                                        onChangeText={setInputText}
                                        placeholder="Name"
                                        maxLength={40}
                                        numberOfLines={2}
                                    >
                                    </TextInput>
                                </View>
                                <View style={{ flexDirection: "row", justifyContent: "space-evenly" }}>
                                    <Button
                                        onPress={() => {
                                            setItem(inputText)
                                            setInputModalVisible(false)
                                        }}
                                        title="     OK     "
                                    ></Button>
                                    <Button
                                        onPress={() => setInputModalVisible(false)}
                                        title="Cancel"
                                    ></Button>
                                </View>
                            </View>
                        </Modal>
                    }
                    <View style={{ alignItems: "center", flex: 5 }}>
                        <View style={{ flexDirection: "row" }}>
                            <Text style={{ flex: 1, textAlign: "center", fontSize: 18 }}>Name</Text>
                            <Text style={{ flex: 1, textAlign: "center", fontSize: 18 }}>Round Time</Text>
                            <Text style={{ flex: 1, textAlign: "center", fontSize: 18 }}>Rest Time</Text>
                            <Text style={{ flex: 1, textAlign: "center", fontSize: 18 }}>Ready Time</Text>
                            <Text style={{ flex: 1, textAlign: "center", fontSize: 18 }}>Intervals</Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <View style={{ flex: 1, height: 1, backgroundColor: 'black' }} />
                        </View>
                        <ScrollView style={{ width: "100%" }}>
                            {allItems && allItems.map((item, index) => {
                                return (
                                    <View key={index} style={{ flex: 1, flexDirection: "column", padding: 10 }}>
                                        <TouchableOpacity
                                            onPress={() => {
                                                setRoundLength(item.storeRoundLength)
                                                setRestLength(item.storeRestLength)
                                                setIntervals(item.storeIntervals)
                                                setModalVisible(false)
                                            }}
                                            onLongPress={() => {
                                                deleteItem(item.title)
                                            }}
                                        >
                                            <View style={{ flexDirection: "row" }}>
                                                <Text style={{ flex: 1, textAlign: "left" }}>{item.title}</Text>
                                                <Text style={{ flex: 1, textAlign: "center" }}>{item.storeRoundLength}</Text>
                                                <Text style={{ flex: 1, textAlign: "center" }}>{item.storeRestLength}</Text>
                                                <Text style={{ flex: 1, textAlign: "center" }}>0</Text>
                                                <Text style={{ flex: 1, textAlign: "center" }}>{item.storeIntervals}</Text>
                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                )
                            })}
                        </ScrollView>

                    </View>
                    <View style={{ flex: .5, justifyContent: "flex-end" }}>
                        <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
                            <Button
                                onPress={() => setInputModalVisible(true)}
                                title="    New     "
                            ></Button>
                            <Button
                                onPress={getAllItemsHandle}
                                title="     Get     "
                            ></Button>
                            <Button
                                onPress={deleteAllItemsHandle}
                                title=" Delete "
                            ></Button>
                        </View>
                    </View>
                </View>
            </Modal>
        </View >
    );
}

export default StoreButton;

const styles = StyleSheet.create({
    textinput: {
        borderWidth: 2,
        borderColor: 'gray',
        borderRadius: 15,
        margin: 20,
        justifyContent: "center",
        alignItems: "center",
        padding: 10
    },
})