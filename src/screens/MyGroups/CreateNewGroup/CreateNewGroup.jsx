import Amplify, { Auth } from 'aws-amplify';
import React, { Component, useState, useEffect } from 'react';

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
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
// import {imageUploadGroup} from '../../../service/Group/CreateGroup';
import { MaterialIcons } from '@expo/vector-icons'; 
import { createGroup,imageUploadGroup } from '../../../service/Group/GroupService';
import { currentSession } from '../../../util/AmplifyCurrentSession';
import { getUserByPoolId } from "../../../service/User/UserService";
// import {createGroup} from '../../../service/Group/CreateGroup';

const window = Dimensions.get('window');
const screen = Dimensions.get('screen');

const CreateNewGroup = ({ navigation }) => {
  const [imageUri, setImageUri] = useState(null);
  const [dimensions, setDimensions] = useState({ window, screen });
  const [base64Image, setBase64Image] = useState(null);
  const [groupName, setGroupName] = useState('');
  const [groupDesc, setGroupDesc] = useState('');
  const [id, setId] = useState("");
  const [userName, setUserName] = useState("");

  // Gives current cognito pool id
  const currentUser = currentSession();
  console.log(currentUser);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const {
          status,
        } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');

        }
      }
    })();

    (async () => {
          const fetchedPosts = await getUserByPoolId(currentSession());
          //var r=JSON.parse(fetchedPosts);
          //console.log(fetchedPosts.body);
          //console.log(fetchedPosts.status);
          if (fetchedPosts.status != "500") {
            console.log("in");
            setUserName(fetchedPosts.body.fullName);
            setId(fetchedPosts.body.id);
          }
          //setPosts(fetchedPosts);
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

  const handleCreateButton = async ()  => {
    console.log(":::::::::::Create:::::::::::::::");
    console.log(groupName)
    console.log(groupDesc)
    console.log(currentUser)
//   await createGroup(groupName, groupDesc, currentUser,userName,id).then((result) => {
//     console.log(result.json())
//     console.log(result.body)
//     console.log(result)
//     if (result.status === 200) {
//
//       alert("Group uploaded successfully");
//     } else {
//       alert(
//         "Oops! There was an error uploading your Group. Please try again later."
//       );
//     }
//   });
  const res=await createGroup(groupName, groupDesc, currentUser,userName,id);
  console.log(res.body)
  //const res=fetchedPosts.json()
    if (res.status == "200") {
    await imageUploadGroup(imageUri, base64Image,res.body,currentUser).then((result) => {
          if (result.status === 200) {
            alert("Group created successfully");
          } else {
            alert(
              "Oops! There was an error uploading your image."
            );
          }
        });
    } else if (res.status == "500") {
    alert("Oops! There was an error uploading your Group. Please try again later.");
    }
    navigation.pop();
  };

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity onPress={pickImage}>
      {imageUri ? (
            <Image
              source={{ uri: imageUri }}
              style={{
                height: 150,
                width: 150,
                paddingTop: 30,
                borderRadius: 100,
                marginLeft: 135,
                marginTop: 30,
              }}
            />
          ) : (
            <Image
              resizeMode="contain"
              style={{
                height: 150,
                width: 150,
                borderRadius: 10,
                marginLeft: 135,
                marginTop: 30,
              }}
              source={require("../../../../assets/icon.png")}
            />
          )}
          </TouchableOpacity>
      <View style={[styles.textInputArea, style]}>
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
      <View style={styles.SaveArea}>
        {/* <TouchableOpacity
          style={{ ...styles.createButton,}}
          onPress={handleCreateButton}
        >
          <MaterialIcons name="group-add" size={20} color="black" />
        </TouchableOpacity> */}
        <TouchableOpacity style={styles.saveButton} onPress={handleCreateButton}>
        <Text style={styles.saveButtonText}>Create</Text>
      </TouchableOpacity> 
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderBottomWidth: 1,
    borderColor: '#D9D5DC',
    backgroundColor: 'transparent',
  },
  createGroupButton: {
    marginTop: '3%',
    alignSelf: 'center',
    paddingLeft: 16,
    paddingRight: 16,
  },
  headerBig1: {
    ...Platform.select({
      android: {
        height: '15%',
      },
    }),
  },
  scrollArea: {
    backgroundColor: 'rgb(242,242,247)',
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
    alignSelf: 'center',
    marginTop: '2%',
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
    alignSelf: 'center',
    width: '85%',
    borderBottomWidth: 1,
    borderColor: '#D9D5DC',
    backgroundColor: 'transparent',
  },
  footer: {
    height: 73,
  },
  inputStyle: {
    color: '#000',
    fontSize: 16,
    alignSelf: 'stretch',
    flex: 1,
    // backgroundColor: 'red',
    paddingBottom: 8,
    marginTop: '5%',
  },
});

export default CreateNewGroup;
