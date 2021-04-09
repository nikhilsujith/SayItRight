import Amplify, { Auth } from "aws-amplify";
import React, { Component, useState, useEffect } from "react";

import {
  StyleSheet,
  View,
  ScrollView,
  Image,
  Button,
  Platform,
  Text,
  TouchableOpacity,
  style,
  TextInput,
} from "react-native";
import * as ImagePicker from "expo-image-picker";

const CreateNewGroup = (props) => {
  const [imageUri, setImageUri] = useState(null);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const {
          status,
        } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      base64: true,
    });

    // console.log(result);

    if (!result.cancelled) {
      setImageUri(result.uri);
      setBase64Image(result.base64);
    }
  };

  // Get current session ID
  // let cognitoPoolId = Auth.user.attributes.sub;

  // console.log(Auth.user.attributes);

  const handleCreateButton = () => {
    // if (groupName.length > 0 && groupDesc.length > 0 && cognitoPoolId != '') {
    //   createGroup(groupName, groupDesc, cognitoPoolId);
    // } else {
    //   alert('Both fields are required to create a new group');
    // }
  };

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity onPress={pickImage}>
        {imageUri ? (
          <Image
            source={{ uri: imageUri }}
            style={{ width: 200, height: 200 }}
          />
        ) : (
          <Image source={require("../assets/images/avatar.png")} />
        )}
      </TouchableOpacity>
      <View style={[styles.textInputArea, style]}>
        <TextInput
          style={styles.inputStyle}
          type="text"
          placeholder="Group Name"
          onChangeText={(groupName) => setGroupName(groupName)}
        />
      </View>
      <View style={[styles.textInputArea, style]}>
        <TextInput
          style={styles.inputStyle}
          type="text"
          placeholder="Group Name"
          onChangeText={(groupDesc) => setGroupDesc(groupDesc)}
        />
      </View>
      <View style={styles.createGroupButton}>
        <Button title="Create" onPress={() => handleCreateButton()} />
      </View>
      {/* <Footer style={styles.footer}></Footer> */}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderBottomWidth: 1,
    borderColor: "#D9D5DC",
    backgroundColor: "transparent",
  },
  createGroupButton: {
    marginTop: "3%",
    alignSelf: "center",
    paddingLeft: 16,
    paddingRight: 16,
  },
  headerBig1: {
    ...Platform.select({
      android: {
        height: "15%",
      },
    }),
  },
  scrollArea: {
    backgroundColor: "rgb(242,242,247)",
    flex: 1,
    marginLeft: 5,
    marginRight: 5,
  },
  headerBig: {
    height: 100,
  },
  scrollArea_contentContainerStyle: {
    height: 608,
  },
  image: {
    height: 200,
    alignSelf: "center",
    marginTop: "2%",
    // marginLeft: 82,
    // marginRight: 82,
  },
  textInputArea: {
    // height: 60,
    marginTop: 16,
    marginLeft: 9,
    marginRight: 9,
    // backgroundColor: 'black',
    alignSelf: "center",
    width: "85%",
    borderBottomWidth: 1,
    borderColor: "#D9D5DC",
    backgroundColor: "transparent",
  },
  footer: {
    height: 73,
  },
  inputStyle: {
    color: "#000",
    fontSize: 16,
    alignSelf: "stretch",
    flex: 1,
    // backgroundColor: 'red',
    paddingBottom: 8,
    marginTop: "5%",
  },
});

export default CreateNewGroup;
