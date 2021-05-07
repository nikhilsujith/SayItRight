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
import { getGroupById } from "../../../service/Group/GroupService";
// import {createGroup} from '../../../service/Group/CreateGroup';

const window = Dimensions.get("window");
const screen = Dimensions.get("screen");

const EditGroup = ({ navigation, route }) => {
  const [groupId, setGroupId] = useState("");
  const [groupName, setGroupName] = useState("");
  const [groupDesc, setGroupDesc] = useState("");
  const [imageUri, setImageUri] = useState(null);
  const [onlineImageUri, setOnlineImageUri] = useState("");
  const [dimensions, setDimensions] = useState({ window, screen });
  const [base64Image, setBase64Image] = useState(null);
  const [creatorID, setCreatorID] = useState("");
  const [creatorName, setCreatorName] = useState("");
  const [creatorPoolId, setCreatorPoolId] = useState("");
  const [users, setUsers] = useState("");
  const [createdOn, setCreatedOn] = useState("");
  const [updatedOn, setUpdatedOn] = useState("");
  const [userName, setUserName] = useState("");

  // Gives current cognito pool id
  const currentUser = currentSession();

  const {
    createdGroupDesc,
    createdGroupId,
    createdGroupImage,
    createdGroupName,
  } = route.params;

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

    setImageUri(createdGroupImage);
    setGroupName(createdGroupName);
    setGroupDesc(createdGroupDesc);
    setGroupId(createdGroupId);
    setOnlineImageUri(createdGroupImage)

//     (async () => {
//       const fetchedPosts = await getGroupById(groupId);
//       if (fetchedPosts.status != "500") {
//         console.log("in");
//         console.log(fetchedPosts.body)
//         setGroupName(fetchedPosts.body.groupName);
//         setGroupDesc(fetchedPosts.body.groupDesc);
//         setOnlineImageUri(fetchedPosts.body.groupImage);
//         setImageUri(fetchedPosts.body.groupImage);
//         setCreatorID(fetchedPosts.body.creatorID);
//         setCreatorName(fetchedPosts.body.creatorName);
//         setCreatorPoolId(fetchedPosts.body.creatorPoolId);
//         setUsers(fetchedPosts.body.users);
//         setCreatedOn(fetchedPosts.body.createdOn);
//         setUpdatedOn(fetchedPosts.body.updatedOn);
//       }
//     })();

  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      base64: true,
    });

    if (!result.cancelled) {
      setImageUri(result.uri);
      setBase64Image(result.base64);
    }
  };

  const handleUpdateButton = async () => {
    console.log("----update group-----")
    var error_flag=0
    if(groupId!=""){
    const content = {
        id: groupId,
        groupName:groupName,
        groupDesc:groupDesc,
        groupImage:onlineImageUri,
      };

  const url = "https://say-it-right.herokuapp.com/api/v1/group/updateGroup?poolId="+currentSession();
  console.log(url)
  const response = await fetch(url, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(content),
  });
  var updateGroupStatus = await response.status;
  console.log(updateGroupStatus); //200 success

    if (updateGroupStatus == "200" && onlineImageUri!=imageUri && imageUri!=null) {
      await imageUploadGroup(imageUri, base64Image, groupId, currentUser).then(
        (result) => {
          if (result.status !== 200) {
            error_flag=1;
            alert("Oops! There was an error uploading your image.");
          }
        }
      );
    }
    if(updateGroupStatus == "200" && error_flag==0){
        alert("success");
        navigation.pop();
    }
    else{
        alert("Something went wrong!")
    }

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
      <View style={{flex: 1,marginTop: "5%",}}>
        <Button color="black" title="Save" onPress={handleUpdateButton}/>
      </View>
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
    top: 60,
    borderRadius: 10,
    // paddingHorizontal: 25,
    paddingVertical: 5,
    borderColor: "black",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    marginLeft: 160,
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

export default EditGroup;

