import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Dimensions } from "react-native";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import IncrementDecrementbutton from "./IncrementDecrementButton";

var { height, width } = Dimensions.get('window');

const Timer = (props) => {
    const { name, icon } = props;
    const [count, setCount] = useState(0);

    return (
        <View style={styles.timerContainer}>
            <View style={styles.row}>
                <Icon name={icon} size={50} />
                <View style={styles.column}>
                    <Text>
                        {count}
                    </Text>
                    <Text>
                        {name}
                    </Text>
                </View>
                <View style={styles.buttonColumn}>
                    <IncrementDecrementbutton count={count} countChanger={setCount}>
                    </IncrementDecrementbutton>
                </View>
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    timerContainer: {
        //flex: 0,
        width: width,
        height: height / 7,
        justifyContent: "center",
        paddingHorizontal: 10
    },
    row: {
        flexDirection: "row",
        width: width,
        justifyContent: "space-between",
        paddingHorizontal: 20,
        marginTop: 20,
    },
    column: {
        //flexDirection: "column", //this appears to be implied
        flex: 1,
        //width: width,
        justifyContent: "center",
        paddingHorizontal: 10,
        //marginTop: 20,
    },
    buttonColumn: {
        //flexDirection: "column", //this appears to be implied
        flex: 1,
        //width: width,
        justifyContent: "center",
        paddingHorizontal: 10,
        //marginTop: 20,
    },
});

export default Timer;