import Amplify, { Auth } from "aws-amplify";
import React, { Component, useState, useEffect } from "react";

import {
  StyleSheet,
  View,
  ScrollView,
  Dimensions,
  Image,
  Button,
  Platform,
  Text,
  TouchableOpacity,
  style,
  TextInput,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
// import {imageUploadGroup} from '../../../service/Group/CreateGroup';
import { MaterialIcons } from "@expo/vector-icons";
import {
  createGroup,
  imageUploadGroup,
} from "../../../service/Group/GroupService";
import { currentSession } from "../../../util/AmplifyCurrentSession";
import { getUserByPoolId } from "../../../service/User/UserService";
// import {createGroup} from '../../../service/Group/CreateGroup';

const window = Dimensions.get("window");
const screen = Dimensions.get("screen");

const CreateNewGroup = ({ navigation }) => {
  const [imageUri, setImageUri] = useState(null);
  const [dimensions, setDimensions] = useState({ window, screen });
  const [base64Image, setBase64Image] = useState(null);
  const [groupName, setGroupName] = useState("");
  const [groupDesc, setGroupDesc] = useState("");
  const [id, setId] = useState("");
  const [userName, setUserName] = useState("");

  // Gives current cognito pool id
  const currentUser = currentSession();

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

    (async () => {
      const fetchedPosts = await getUserByPoolId(currentSession());
      if (fetchedPosts.status != "500") {
        setUserName(fetchedPosts.body.fullName);
        setId(fetchedPosts.body.id);
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

  const handleCreateButton = async () => {
    if (groupName === "" || groupDesc === "" || userName === "") {
      alert("Please enter all fields");
    } else {
      const res = await createGroup(
        groupName,
        groupDesc,
        currentUser,
        userName,
        id
      );
      if (res.status == "200") {
        await imageUploadGroup(
          imageUri,
          base64Image,
          res.body,
          currentUser
        ).then((result) => {
          if (result.status === 200) {
            alert("Group created successfully");
          } else {
            alert("Oops! There was an error uploading your image.");
          }
        });
      } else if (res.status == "500") {
        alert(
          "Oops! There was an error uploading your Group. Please try again later."
        );
      }
      navigation.pop();
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={{ ...styles.containCard }}>
        <TouchableOpacity onPress={pickImage}>
          {imageUri ? (
            <Image
              source={{ uri: imageUri }}
              style={{
                ...styles.imagePicker,
              }}
            />
          ) : (
            <Image
              resizeMode="contain"
              style={{
                ...styles.imagePicker,
              }}
              source={require("../../../../assets/icon.png")}
            />
          )}
        </TouchableOpacity>
      </View>
      <View>
        <View style={{ ...styles.textInputArea }}>
          <TextInput
            style={styles.inputStyle}
            type="text"
            placeholder="Group Name"
            value={groupName}
            onChangeText={(val) => setGroupName(val)}
          />
        </View>
        <View style={[styles.textInputArea, style]}>
          <TextInput
            style={styles.inputStyle}
            type="text"
            placeholder="Group Desc"
            value={groupDesc}
            onChangeText={(val) => setGroupDesc(val)}
          />
        </View>
      </View>
      <TouchableOpacity style={styles.saveButton} onPress={handleCreateButton}>
        <Text style={styles.saveButtonText}>Create</Text>
      </TouchableOpacity>
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
  SaveArea: {
    alignContent: "center",
    marginRight: 150,
  },

  saveButton: {
    borderRadius: 10,
    // paddingHorizontal: 25,
    paddingVertical: 5,
    borderColor: "black",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    margin: 10
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
  imagePicker: {
    height: 150,
    width: 150,
    borderRadius: 100,
    resizeMode: "cover",
    backgroundColor: "#dfdfdf",
    paddingTop: 30,
    margin: 10,
    alignSelf: "center",
  },
  containCard: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
    backgroundColor: "white",
    borderRadius: 15,
    padding: 5,
    borderColor: "white",
    shadowColor: "#470000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    elevation: 1,
  },
});

export default CreateNewGroup;
