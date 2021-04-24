import React, { Component } from "react";
import { StyleSheet, View, Text, Image, Button } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { theme } from "../../constants/theme";

const defaultImage = {
  uri: "https://nik-dev-personal-bucket.s3.amazonaws.com/nikhilsujith-008.PNG",
};

function GroupCard({ cardTitle, cardDesc, cardImageLink }) {
  let link = "";
  if (cardImageLink) {
    if (cardImageLink.length > 0) {
      link = { uri: cardImageLink };
    }
  } else {
    link = defaultImage;
  }
  return (
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
        <Image source={link} resizeMode="cover" style={styles.image3}></Image>
      </View>
    </View>
  );
}

const borderRadius = 15;

const styles = StyleSheet.create({
  // container: {
  //   borderRadius: borderRadius,
  //   marginTop: "1%",
  //   marginBottom: "1%",
  // },
  groupCardTextArea: {
    top: 0,
    left: 0,
    height: 143,
    position: "absolute",
    right: 137,
  },
  groupCardTitle: {
    width: 229,
    height: 36,
    // backgroundColor: "rgba(74,21,75,1)",
    backgroundColor: theme.secondary.backgroundColor,
    color: theme.secondary.color,
    borderTopLeftRadius: borderRadius,
    // borderWidth: 1,
    // borderColor: "rgba(230,230,230,1)",
  },
  cardTitle: {
    // color: "rgba(255,255,255,1)",
    color: theme.secondary.color,
    height: 20,
    fontSize: 17,
    width: 211,
    marginTop: 7,
    marginLeft: 9,
  },
  groupCardDesc: {
    width: 229,
    height: 107,
    backgroundColor: "rgba(255,255,255,1)",
    borderBottomLeftRadius: borderRadius,
    // borderBottomWidth: 1,
    // borderLeftWidth: 1,
    // borderColor: "rgba(74,21,75,1)",
    // borderColor: "#ECB22E",
    justifyContent: "center",
  },
  cardDesc: {
    // color: "rgba(0,0,0,1)",
    fontSize: 14,
    height: 91,
    width: 216,
    alignSelf: "center",
  },
  groupCardImageContainer: {
    top: 0,
    left: 228,
    height: 143,
    position: "absolute",
    backgroundColor: theme.secondary.backgroundColor,
    borderTopRightRadius: borderRadius,
    borderBottomRightRadius: borderRadius,
    // borderRadius: "null",
    // borderWidth: 1,
    // borderColor: "rgba(230,230,230,1)",
    // borderColor: theme.primary.backgroundColor,
    right: 0,
  },
  image3: {
    flex: 1,
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: borderRadius,
    borderTopRightRadius: borderRadius,
  },
  groupCardTextAreaStack: {
    margin: 10,
    height: 143,
    borderRadius: borderRadius,
    shadowColor: '#470000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.2,
    elevation: 1,
  },
});

export default GroupCard;
