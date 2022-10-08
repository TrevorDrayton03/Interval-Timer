import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Timer from "./src/components/Timer";
import { Dimensions } from "react-native";

var { height, width } = Dimensions.get('window');


const App = () => {

  return (
    <View style={styles.container}>
      <Timer name="Round Length" icon="boxing-glove">
      </Timer>
      <Timer name="Rest Time" icon="arrow-down-circle">
      </Timer>
      <Timer name="Rounds" icon="alarm-bell">
      </Timer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    //flex: 0,
    justifyContent: "center",
    width: width,
    height: height
  },
});
export default App;