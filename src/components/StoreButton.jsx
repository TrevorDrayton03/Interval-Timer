import React, { useState, useEffect } from "react";
import { Modal, Button, Text, View, TouchableOpacity, Alert, TextInput, ScrollView } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { styles } from "../styles/styles"

const StoreButton = ({ roundLength, restLength, intervals, readyLength, setRoundLength, setRestLength, setIntervals, setReadyLength }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [allItems, setAllItems] = useState(null);
    const [inputModalVisible, setInputModalVisible] = useState(false);
    const [inputText, setInputText] = useState(null);

    useEffect(() => {
        getAllItemsHandle()
        setInputText(null)
    }, [inputModalVisible])

    const setItem = async (title) => {
        let training = {
            "title": title,
            "storeRoundLength": roundLength,
            "storeRestLength": restLength,
            "storeReadyLength": readyLength,
            "storeIntervals": intervals,
        }
        try {
            training = JSON.stringify(training);
            await AsyncStorage.setItem(title, training);
            await getAllItemsHandle()
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
            await getAllItemsHandle()
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

    const updateItem = async (key) => {
        try {
            await AsyncStorage.mergeItem(key);
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

    const handleDelete = (key) => {
        Alert.alert(
            'Delete',
            'Are you sure you want to delete ' + key + '?',
            [
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
                {
                    text: 'Delete',
                    onPress: () => {
                        deleteItem(key)
                    },
                },
            ],
            { cancelable: false },
        );
    };

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
                <View style={styles.storeButtonModalView}>
                    {
                        <Modal
                            visible={inputModalVisible}
                            animationType="none"
                            onRequestClose={() => setInputModalVisible(false)}
                        >
                            <View style={styles.storeButtonInputModalContainer}>
                                <Text style={styles.storeButtonInputModalTitle}>Store Current Settings</Text>
                                <View style={styles.storeButtonTextInputContainer}>
                                    <TextInput
                                        onChangeText={setInputText}
                                        placeholder="Name"
                                        maxLength={40}
                                        numberOfLines={2}
                                        style={styles.storeButtonTextInput}
                                    >
                                    </TextInput>
                                </View>
                                <View style={styles.storeButtonButtonInputContainer}>
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
                    <View style={styles.storeButtonModalContainer}>
                        <View style={styles.storeButtonRowContainer}>
                            <Text style={styles.storeButtonRow1}>Name</Text>
                            <Text style={styles.storeButtonRow2}>Round</Text>
                            <Text style={styles.storeButtonRow2}>Rest</Text>
                            <Text style={styles.storeButtonRow2}>Ready</Text>
                            <Text style={styles.storeButtonRow3}>Interval</Text>
                        </View>
                        <View style={styles.storeButtonRowContainer}>
                            <View style={styles.storeButtonBlackBar1} />
                        </View>
                        <ScrollView style={styles.storeButtonScrollView}>
                            {allItems && allItems.map((item, index) => {
                                return (
                                    <View key={index} style={styles.storeButtonColumnContainer}>
                                        <TouchableOpacity
                                            onPress={() => {
                                                setRoundLength(item.storeRoundLength)
                                                setRestLength(item.storeRestLength)
                                                setReadyLength(item.storeReadyLength)
                                                setIntervals(item.storeIntervals)
                                                setModalVisible(false)
                                            }}
                                            onLongPress={() => {
                                                handleDelete(item.title)
                                            }}
                                        >
                                            <View style={styles.storeButtonRowContainer}>
                                                <Text style={styles.storeButtonRow4}>{item.title}</Text>
                                                <Text style={styles.storeButtonRow5}>{item.storeRoundLength}</Text>
                                                <Text style={styles.storeButtonRow5}>{item.storeRestLength}</Text>
                                                <Text style={styles.storeButtonRow5}>{item.storeReadyLength}</Text>
                                                <Text style={styles.storeButtonRow4}>{item.storeIntervals}</Text>
                                            </View>
                                            <View style={styles.storeButtonRowContainer}>
                                                <View style={styles.storeButtonBlackBar2} />
                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                )
                            })}
                        </ScrollView>

                    </View>
                    <View style={styles.storeButtonFooterContainer}>
                        <View style={styles.storeButtonFooter}>
                            <Button
                                onPress={() => setInputModalVisible(true)}
                                title="    New     "
                            ></Button>
                        </View>
                    </View>
                </View>
            </Modal>
        </View >
    );
}

export default StoreButton;
