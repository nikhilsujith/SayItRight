import React, { useState, useEffect } from "react";
import {
  Platform,
  View,
  Image,
  Text,
  SafeAreaView,
  YellowBox,
  StatusBar,
} from "react-native";
import { StyleSheet, Dimensions, ScrollView } from "react-native";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { MaterialIcons } from "@expo/vector-icons";
import { Foundation } from "@expo/vector-icons";
import { logout } from "../../util/CustomAmplifyAuth";
import { Entypo } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { getUserByPoolId } from "../../service/User/UserService";
import { imageUpload } from "../../service/User/ImageUpload";
import { uploadVideoAsync } from "../../service/User/VideoUpload";
import { uploadAuido } from "../../service/User/Audio";
import { Player} from '../../components/Player';
import {
  currentSession,
  currentSessionEmail,
} from "../../util/AmplifyCurrentSession";
import Amplify, { Auth } from "aws-amplify";
import awsconfig from "../../aws-exports";
Amplify.configure(awsconfig);
import { withAuthenticator } from "aws-amplify-react-native";
import { FloatingActionButton, NameCard } from "../../components";
import { NavigationContainer } from "@react-navigation/native";
import { MainStackScreen, NewProfileStackScreen } from "../../routes";
import { RNS3 } from "react-native-s3-upload";
const window = Dimensions.get("window");
const screen = Dimensions.get("screen");

import * as Updates from "expo-updates";
import { Container, Content, Root, Button, ActionSheet } from "native-base";

const UserDetails = ({ navigation }) => {
  const [id, setId] = useState("");
  const [myGroups, setMyGroups] = useState("");
  const [enrolledGroups, setEnrolledGroups] = useState("");
  const [createdOn, setCreatedOn] = useState("");
  const [userName, setUserName] = useState("");
  const [onlineImage, setOnlineImage] = useState("");
  const [onlineVideo, setOnlineVideo] = useState("");
  const [userObject, setUserObject] = useState("");
  const [nameDesc, setNameDesc] = useState("");
  const [nameMeaning, setNameMeaning] = useState("");
  const [imageUri, setImageUri] = useState(null);
  const [videoUri, setVideoUri] = useState(null);
  const [base64Image, setBase64Image] = useState(null);
  const [videoSource, setVideoSource] = useState(null);
  const [audioUri, setAudioUri] = useState(null);
  const [audioS3Loc, setAudioS3Loc] = useState("");
  const [dimensions, setDimensions] = useState({ window, screen });

  const disableSave =
    userName === "" || nameDesc === "" || nameMeaning === "" || !imageUri;

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
      //var r=JSON.parse(fetchedPosts);
      console.log(fetchedPosts.body);
      console.log(fetchedPosts.status);
      if (fetchedPosts.status != "500") {
        console.log("in");
        setAudioS3Loc(fetchedPosts.body.audioFile);
        setNameDesc(fetchedPosts.body.desc);
        setNameMeaning(fetchedPosts.body.nameMeaning);
        setUserName(fetchedPosts.body.fullName);
        setImageUri(fetchedPosts.body.profileImage);
        setOnlineImage(fetchedPosts.body.profileImage);
        setId(fetchedPosts.body.id);
        setMyGroups(fetchedPosts.body.myGroups);
        setEnrolledGroups(fetchedPosts.body.enrolledGroups);
        setCreatedOn(fetchedPosts.body.createdOn);
        setOnlineVideo(fetchedPosts.body.videoFile);
        //         console.log(userName);
        //                 console.log(fetchedPosts.body.audioFile)
      }
      //setPosts(fetchedPosts);
    })();

    Dimensions.addEventListener("change", onChange);
    return () => {
      Dimensions.removeEventListener("change", onChange);
    };
  }, []);

  const onChange = ({ window, screen }) => {
    setDimensions({ window, screen });
  };

  const options = {
    keyPrefix: "audio/",
    bucket: "amplify-sayitright-dev-141916-deployment",
    region: "us-east-2",
    accessKey: "AKIAYXRZLB7D4SBCJ7OY",
    secretKey: "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",
    successActionStatus: 201,
  };

  const uploadS3 = async () => {
    if (audioUri != null && audioUri != "") {
      const file = {
        // `uri` can also be a file system path (i.e. file://)
        uri: audioUri,
        name: currentSession() + "_audio.caf",
        type: "audio/x-caf",
      };

      try {
        const res = await RNS3.put(file, options);
        const loc = await res.body.postResponse.location;
        //console.log(res.body);
        return loc;
      } catch (ex) {
        return "error";
      }
    }
  };

  

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

  const handleSaveButton = async () => {
    console.log(":::::::::::HANDLE Update:::::::::");
    //console.log(await uploadS3())
    if (audioS3Loc != null && audioS3Loc != "" && audioS3Loc != "error") {
      setAudioS3Loc(await uploadS3());
    }

    console.log(currentSession());
    console.log(imageUri);
    console.log(audioS3Loc);

    if (audioS3Loc != null && audioS3Loc != "" && audioS3Loc != "error") {
      //console.log("in")
      const content = {
        id: id,
        poolId: currentSession(),
        fullName: userName,
        profileImage: onlineImage,
        email: currentSessionEmail() == null ? "" : currentSessionEmail(),
        desc: nameDesc,
        nameMeaning: nameMeaning,
        audioFile: audioS3Loc == null ? "" : audioS3Loc,
        videoFile: onlineVideo,
        myGroups: myGroups,
        enrolledGroups: enrolledGroups,
        createdOn: createdOn,
        updatedOn: Date().toLocaleString(),
      };

      const url = "https://say-it-right.herokuapp.com/api/v1/user/addUser";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(content),
      });
      // const body = await response.json();
      const newUserStatus = await response.status;
      console.log(newUserStatus); //201 created

      if (userName.length > 0 && nameDesc.length > 0 && newUserStatus == 201) {
        imageUpload(imageUri, base64Image, currentSession()).then((result) => {
          if (result.status === 200) {
            alert("Image uploaded successfully");
          } else {
            alert(
              "Oops! There was an error uploading your Image. Please try again later."
            );
          }
        });
        uploadVideoAsync(
          videoUri || videoSource,
          base64Image,
          currentSession()
        ).then((result) => {
          if (result.status === 200) {
            alert("Video uploaded successfully");
          } else {
            alert(
              "Oops! There was an error uploading your Video. Please try again later."
            );
          }
        });
      }
      if (newUserStatus == 201) {
        alert("Success");
        //await Updates.reloadAsync();
      }
    } else {
      alert("Upload audio!");
    }
  };
  const pickVideo = async () => {
    let result2 = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
      allowsEditing: true,
      aspect: [4, 3],
      base64: true,
    });

    // //console.log(result);

    if (!result2.cancelled) {
      setVideoUri(result2.uri);
      setBase64Image(result2.base64);
    }
  };

  const onPlaySelected =(videoUri) =>{
    console.log("::::::::::::::::::" , videoUri || videoSource);

  }

  const onAudioSelected = (uri) => {
    setAudioUri(uri);
    console.log(uri);
  };

  const onVideoSelected = (uri) => {
    setVideoUri(uri);
    console.log("::::::::::::videoURI:::::::::" ,uri);
  };

  const BUTTONS = ["Gallery", "Camera", "Cancel"];
  const DESTRUCTIVE_INDEX = null;
  const CANCEL_INDEX = 2;
  const [btn, setBtn] = React.useState();
  
  const onCameraVideo = (uri) => {
    setVideoSource(uri);
    console.log(uri);
  };
  
  
  return (
    <SafeAreaView style={{ flex: 1 }}>
    <View style={styles.container}>
      <View>
        <TouchableOpacity onPress={pickImage}>
          {imageUri ? (
            <Image
              source={{ uri: imageUri }}
              style={{
                height: 150,
                width: 150,
                paddingTop: 30,
                borderRadius: 100,
                marginRight: 0,
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
                marginRight: 0,
                marginTop: 30,
              }}
              source={require("../../../assets/icon.png")}
            />
          )}
        </TouchableOpacity>
      </View>
      <View style={styles.InputArea}>
        <TextInput
          placeholder="Name"
          style={styles.input}
          value={userName}
          onChangeText={(val) => setUserName(val)}
        />

        <TextInput
          placeholder="Name Description"
          style={styles.input}
          value={nameDesc}
          onChangeText={(val) => setNameDesc(val)}
        />
      </View>

     <View style={{}}>
    
     </View>

      <Root>
        <View style={{flexDirection:'row', alignSelf:'center', marginTop: 150}}>
        <TouchableOpacity 
          style={styles.audioIcon}
          onPress={() =>
            navigation.push("SettingsAudioStack", {
              onAudioSelected: onAudioSelected,
            })
          }
        >
          <MaterialIcons name="keyboard-voice" size={24} color="black" />
        </TouchableOpacity>
        
        <TouchableOpacity
          style={{ ...styles.videoIcon }}
          onPress={() =>
            ActionSheet.show(
              {
                
                options: BUTTONS,
                cancelButtonIndex: CANCEL_INDEX,
                destructiveButtonIndex: DESTRUCTIVE_INDEX,
                title: "Select Video Source",
              },
              (buttonIndex) => {
                if (buttonIndex == 0) {
                  pickVideo();
                  onVideoSelected(videoUri);
                  
                } else if (buttonIndex == 1) {
                  navigation.push("SettingsRecordingStack", {
                    onCameraVideo: onCameraVideo,
                  });
                }
              }
            )
          }
        >
          <Foundation name="video" size={24} color="black" />
        </TouchableOpacity>
        </View>
      </Root>
      <TouchableOpacity style={styles.saveButton} onPress={handleSaveButton}>
        <Text style={styles.saveButtonText}>Save</Text>
      </TouchableOpacity> 
      
      <View style={{ flex: 1, left: 180, top: 10 }}>
        <FloatingActionButton
          onPress={() => logout()}
          icon={<MaterialIcons name="logout" color="black" />}
        />
      </View>
    </View>
    </SafeAreaView>


  );
  return (
    <SafeAreaView>
      <NameCard />
    </SafeAreaView>
  );
};

const { width } = Dimensions.get("screen");
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  input: {
    borderColor: "black",
    borderBottomWidth: 1,
    width: width / 1.3,
    paddingVertical: 10,
    paddingHorizontal: 0,
    marginTop: 30,
  },
  textFooter1: {
    marginTop: 10,
  },

  SaveArea: {
    alignContent: "center",
    marginRight: 100,
    top: 100,
  },

  buttonView:{
    flex: 1,
    flexDirection: "row",
    alignSelf: "center",
    // marginTop: height * 0.1,
  },

  logout: {
    position: "absolute",
    top: 100,
    left: 300,
    borderRadius: 10,
    paddingHorizontal: 40,
    paddingVertical: 5,
    borderColor: "black",
    alignItems: "center",
    justifyContent: "center",
  },
  InputArea: {
    // marginTop: 50,
  },
  controlBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 45,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },

  action: {
    height: 50,
  },
  textInput1: {
    marginBottom: 10,
  },
  button: {
    flexDirection: "row",
    marginTop: 30,
  },

  saveButton: {
    borderRadius: 10,
    paddingHorizontal: 40,
    paddingVertical: 5,
    borderColor: "black",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    marginTop: 30,
    marginRight: 0,
  },
  audioIcon: {
    borderRadius: 10,
    paddingHorizontal: 40,
    paddingVertical: 5,
    borderColor: "black",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 5,
    borderWidth: 1,
  },
  videoIcon: {
    borderRadius: 10,
    paddingHorizontal: 40,
    paddingVertical: 5,
    borderColor: "black",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    marginLeft: 5,
  },
  SignInForm: {
    width: width - 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  textSign: {
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default Auth.user ? UserDetails : withAuthenticator(UserDetails);
