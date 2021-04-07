import React, { Component } from "react";
import { StyleSheet, View, Text, Image, Button } from "react-native";


const defaultImage = {uri: "https://nik-dev-personal-bucket.s3.amazonaws.com/nikhilsujith-008.PNG"};

function GroupCard({ style, navigation, cardTitle, cardDesc, cardImageLink }) {
  return (
    <View style={[styles.container, style]}>
      <View style={styles.groupCardTextAreaStack}>
        <View style={styles.groupCardTextArea}>
          <View style={styles.groupCardTitle}>
            <Text style={styles.cardTitle}>{cardTitle}</Text>
          </View>
          <View style={styles.groupCardDesc}>
            <Text style={styles.cardDesc}>{cardDesc}</Text>
          </View>
        </View>
        <View style={styles.groupCardImageContainer}>
          <Image
            source = {cardImageLink.length > 5 ? cardImageLink : defaultImage}
            resizeMode="stretch"
            style={styles.image3}
          ></Image>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 15,
    marginTop: '1%',
    marginBottom: '1%',
  },
  groupCardTextArea: {
    top: 0,
    left: 0,
    height: 143,
    position: "absolute",
    right: 137
  },
  groupCardTitle: {
    width: 229,
    height: 36,
    // backgroundColor: "rgba(74,21,75,1)",
    backgroundColor: "grey",
    borderTopLeftRadius: 15,
    borderWidth: 1,
    borderColor: "rgba(230,230,230,1)"
  },
  cardTitle: {
    // color: "rgba(255,255,255,1)",
    color: "black",
    height: 20,
    fontSize: 17,
    width: 211,
    marginTop: 7,
    marginLeft: 9
  },
  groupCardDesc: {
    width: 229,
    height: 107,
    backgroundColor: "rgba(255,255,255,1)",
    borderBottomLeftRadius: 15,
    borderBottomWidth: 1,
    borderLeftWidth: 1,
    borderColor: "rgba(74,21,75,1)",
    // borderColor: "#ECB22E",
    justifyContent: "center"
  },
  cardDesc: {
    color: "rgba(0,0,0,1)",
    fontSize: 14,
    height: 91,
    width: 216,
    alignSelf: "center"
  },
  groupCardImageContainer: {
    top: 0,
    left: 228,
    height: 143,
    position: "absolute",
    backgroundColor: "rgba(74,21,75,1)",
    borderTopRightRadius: 15,
    borderBottomRightRadius: 15,
    // borderRadius: "null",
    borderWidth: 1,
    // borderColor: "rgba(230,230,230,1)",
    borderColor: "#ECB22E",
    right: 0
  },
  image3: {
    borderRadius: 15,
    borderBottomLeftRadius: 15,
    width: '97%',
    flex: 1,
    marginBottom: 4,
    marginTop: 2,
  },
  groupCardTextAreaStack: {
    height: 143,
    marginRight: -1
  }
});

export default GroupCard;