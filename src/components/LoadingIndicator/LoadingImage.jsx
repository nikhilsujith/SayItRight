import React from "react";
import { View, Text, ActivityIndicator, StyleSheet, Image } from "react-native";

const LoadingIndicator = () => {
  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Image style={styles.imagePicker} source={require('../../../assets/Pulse-1s-200px.gif')} />
      </View>
    </View>
  );
};
export default LoadingIndicator;

const styles = StyleSheet.create({
  imagePicker: {
    backgroundColor: "white",
  },
});