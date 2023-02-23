import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { Picker } from '@react-native-picker/picker';


const MinuteSecondPicker = ({ value, setValue }) => {
    const SECONDS = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55];
    const MINUTES = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30
        , 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 7, 58, 59];

    const [minute, setMinute] = useState(MINUTES.indexOf((Math.floor(value / 60) % 60)));
    const [second, setSecond] = useState(SECONDS.indexOf((value % 60)) * 5);

    useEffect(() => {
        setValue(second + minute * 60);
    }, [second, minute])

    return (
        <View style={{ flex: 1, flexDirection: 'row' }}>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ fontSize: 24 }}>Minutes:</Text>
                <Picker
                    selectedValue={MINUTES.indexOf((Math.floor(value / 60) % 60))}
                    style={{ height: 50, width: 100 }}
                    onValueChange={(itemValue) => setMinute(itemValue)}
                >
                    {
                        [...MINUTES.keys()].map((val) => (
                            <Picker.Item
                                key={val}
                                label={val.toString()}
                                value={val}
                                style={{ fontSize: 24 }}
                            />
                        ))
                    }
                </Picker>
            </View>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ fontSize: 24 }}>Seconds:</Text>
                <Picker
                    selectedValue={(SECONDS.indexOf((value % 60))) * 5}
                    style={{ height: 50, width: 100 }}
                    onValueChange={(itemValue) => setSecond(itemValue)}
                >
                    {[...SECONDS.keys()].map((val) => (
                        <Picker.Item
                            key={val}
                            label={(val * 5).toString()}
                            value={val * 5}
                            style={{ fontSize: 24}}
                        />
                    ))}
                </Picker>
            </View>
        </View>
    )
};

export default MinuteSecondPicker;
