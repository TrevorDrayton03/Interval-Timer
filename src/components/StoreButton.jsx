import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// is there any standard practices that I'm not aware of?
// ios will require install of cocoapods: npx pod-install ios

const StoreButton = ({ roundLength, restLength, intervals, setRoundLength, setRestLength, setIntervals }) => {
    const setTraining = async (title) => {
        let training = {
            title: title,
            storeRoundLength: roundLength + 5,
            storeRestLength: restLength + 5,
            storeIntervals: intervals + 1
        }
        try {
            training = JSON.stringify(training);
            await AsyncStorage.setItem('trainingNameHere', training);
        }
        catch (error) {
            console.log(error, " @set");
        }
        console.log("Done setTraining");
    }

    const getTraining = async () => {
        try {
            const getTraining = await AsyncStorage.getItem('trainingNameHere');
            return getTraining != null ? JSON.parse(getTraining) : null;
        }
        catch (error) {
            console.log(error, " @get");
        }
        console.log("Done getTraining");
    }

    const deleteTraining = async () => {
        try {
            await AsyncStorage.removeItem('trainingNameHere');
        }
        catch (error) {
            console.log(error, '@del');
        }
        console.log("Done deleteTraining");
    }
    const updateTraining = async () => {
        try {
            await AsyncStorage.mergeItem('trainingNameHere');
        }
        catch (error) {
            console.log(error, " @upd");
        }
        console.log("Done updateTraining");
    }
    const getAllTraining = async () => {
        let trainings = []
        try {
            trainings = await AsyncStorage.getAllKeys();
            return trainings;
        }
        catch (error) {
            console.log(error, ' @getall');
        }
        console.log("Done getAllTraining");
    }

    // this is the test on press handle
    const onPressHandle = async () => {
        try {
            await setTraining("This Is Titlef");
            const training = await getTraining();
            console.log(training, " this is training");
            setRoundLength(training.storeRoundLength);
            setRestLength(training.storeRestLength);
            setIntervals(training.storeIntervals);
            return getTraining();
        } catch (e) {
            console.log(e, " @onPressHandle")
        }
    }

    return (
        <View>
            <View>
                <TouchableOpacity
                    onPress={onPressHandle}
                >
                    <Icon
                        name={'arrange-bring-forward'} size={50}
                    />
                </TouchableOpacity>

            </View>
        </View>
    );
}

export default StoreButton;