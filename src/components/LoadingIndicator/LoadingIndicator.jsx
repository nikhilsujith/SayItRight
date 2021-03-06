import React from "react";
import { View, Text, ActivityIndicator, StyleSheet, Image } from "react-native";

const LoadingIndicator = () => {
  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <ActivityIndicator color="black" size="large" />
        <Text>Loading</Text>
      </View>
    </View>
  );
};
export default LoadingIndicator;

const styles = StyleSheet.create({
  imagePicker: {
    height: 200,
    width: 200,
    borderRadius: 100,
    resizeMode: "cover",
    backgroundColor: "#dfdfdf",
    paddingTop: 30,
    margin: 10,
  },
});
