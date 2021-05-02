import React from "react";
import { View, Text, ActivityIndicator, StyleSheet, Image } from "react-native";

const LoadingIndicator = () => {
  return (
    <View style={{ flex: 1, backgroundColor: 'black' }}>
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: 'black' 
        }}
      >
        <Image style={styles.imagePicker} source={{uri: 'https://media.tenor.com/images/3f50d15e08bc96c7b1e97e8a1ec3836d/tenor.gif'}} />
      </View>
    </View>
  );
};
export default LoadingIndicator;

const styles = StyleSheet.create({
  imagePicker: {
    height: '70%',
    width: '70%',
    resizeMode: "contain",
    backgroundColor: "black",
    paddingTop: 30,
    margin: 10,
  },
});