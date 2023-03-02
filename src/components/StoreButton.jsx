import React, { useState, useEffect } from "react";
import { Modal, Button, Text, View, TouchableOpacity, Alert, TextInput, ScrollView } from "react-native";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from "../styles/styles"
import helpers from "../helpers/helpers"

const StoreButton = ({ roundLength, restLength, intervals, readyLength, setRoundLength, setRestLength, setIntervals, setReadyLength }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [allItems, setAllItems] = useState(null);
    const [inputModalVisible, setInputModalVisible] = useState(false);
    const [inputText, setInputText] = useState(null);

    // change key to uuivd from title

    useEffect(() => {
        setAllItemsHandle()
        setInputText(null)
    }, [inputModalVisible])

    const setItemHandle = async (title) => {
        let training = {
            "title": title,
            "storeRoundLength": roundLength,
            "storeRestLength": restLength,
            "storeReadyLength": readyLength,
            "storeIntervals": intervals,
        }
        training = JSON.stringify(training);
        await helpers.setItem(title, training);
        await setAllItemsHandle()
    }

    const setAllItemsHandle = async () => {
        const keys = await helpers.getAllKeys()
        setAllItems(await helpers.getMultipleItems(keys));
    }

    const deleteItemHandle = async (key) => {
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
                    onPress: async () => {
                        helpers.deleteItem(key)
                        await setAllItemsHandle(setAllItems)
                    },
                },
            ],
            { cancelable: false },
        );
    };

    const deleteAllItemsHandle = async () => {
        const keys = await helpers.getAllKeys()
        setAllItems(await helpers.deleteMultipleItems(keys));
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
                                            setItemHandle(inputText)
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
                                                deleteItemHandle(item.title)
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
