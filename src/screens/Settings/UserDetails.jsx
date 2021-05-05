import React, { useState, useEffect } from "react";
import { Platform, View, Image, Text, Button } from "react-native";
import { StyleSheet, Dimensions, ScrollView } from "react-native";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { logout } from "../../util/CustomAmplifyAuth";
import { Entypo, Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { getUserByPoolId } from "../../service/User/UserService";
import { imageUpload } from "../../service/User/ImageUpload";
import { uploadVideoAsync } from "../../service/User/VideoUpload";
import { uploadAuido } from "../../service/User/Audio";
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
import {
  Container,
  Content,
  Root,
  ActionSheet,
  Form,
  Item,
  Input,
  Textarea,
  Icon,
} from "native-base";
import { Audio,Video } from "expo-av";


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

  const [recording, setRecording] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [audioDuration, setAudioDuration] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const [sound, setSound] = useState('');
  const [audioFile, setAudioFile] = useState('');

  const video = React.useRef(null);
  const [status, setStatus] = React.useState({});
  const disableSave =
    userName === "" || nameDesc === "" || !imageUri;

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
        console.log("in");
        setAudioS3Loc(fetchedPosts.body.audioFile);
        setNameDesc(fetchedPosts.body.desc);
        setNameMeaning(fetchedPosts.body.nameMeaning);
        setUserName(fetchedPosts.body.fullName);
        setImageUri(fetchedPosts.body.profileImage);
        setVideoUri(fetchedPosts.body.videoFile);
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

  const pickVideo = async () => {
    let videoPick = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
      allowsEditing: true,
      aspect: [4, 3],
      base64: true,
    });

    // console.log(result2)

    if (!videoPick.cancelled) {
      setVideoUri(videoPick.uri);
    }
  };

  const handleSaveButton = async () => {
    if (audioUri != null && audioUri != "") {
      setAudioS3Loc(await uploadS3());
   }

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

      const url = "https://say-it-right.herokuapp.com/api/v1/user/updateUser";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(content),
      });
      const newUserStatus = await response.status;
      console.log(newUserStatus.status); //200 success

      if (userName.length > 0 && nameDesc.length > 0 && newUserStatus === 200 ) {
      if((imageUri!=onlineImage)){
        imageUpload(imageUri, base64Image, currentSession()).then((result) => {
          if (result.status === 200) {
            // alert("Image uploaded successfully");
          } else {
            alert(
              "Oops! There was an error uploading your Image. Please try again later."
            );
          }
        });
      }

      if((videoUri!=onlineVideo && videoUri!=null)){
        await uploadVideoAsync(videoUri || videoSource,base64Image,currentSession()).then((result) => {
          if (result.status == 200) {
            // alert("Video uploaded successfully");
          } else {
            alert(
              "Oops! There was an error uploading your Video. Please try again later."
            );
          }
        });
      }
      }
      if (newUserStatus === 200) {
        // alert("Success");
        //await Updates.reloadAsync();
      }

    } else {
      alert("Upload audio!");
    }
  };

  const onAudioSelected = (uri) => {
    setAudioUri(uri);
    console.log(uri);
  };

  const onVideoSelected = (uri) => {
    setVideoUri(uri);
  };

  const BUTTONS = ["Gallery", "Camera", "Cancel"];
  const DESTRUCTIVE_INDEX = null;
  const CANCEL_INDEX = 2;

  const onCameraVideo = (uri) => {
    setVideoUri(uri);
  };

  async function startRecording() {
      setIsRecording(true)
      try {
        console.log('Requesting permissions..');
        await Audio.requestPermissionsAsync();
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: true,
          playsInSilentModeIOS: true,
        });
        console.log('Starting recording..');
        const recording = new Audio.Recording();
        await recording.prepareToRecordAsync(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY);
        await recording.startAsync();
        setRecording(recording);
        console.log('Recording started');
        setTimeout(() => stopRecording, 4000);
      } catch (err) {
        console.error('Failed to start recording', err);
      }
    }

    async function stopRecording() {
      setIsRecording(false)
      console.log('Stopping recording..');
      setRecording(undefined);
      await recording.stopAndUnloadAsync();
      const uri = recording.getURI();
      setAudioUri(recording.getURI());
      setAudioDuration(recording.durationMillis)
  //    const { dir_sound } = await this.recording.createNewLoadedSoundAsync
  //    setSound(dir_sound);
      console.log('Recording stopped and stored at', uri);
      setAudioUri(uri);
    }

    async function playSound() {
    if(audioS3Loc!=''){
        console.log('Loading Sound');
        setIsPlaying(true)
        console.log(audioS3Loc)
        const file_path2=(audioUri==null?audioS3Loc:audioUri);
        console.log(file_path2)
        const { sound } = await Audio.Sound.createAsync(
           { uri: file_path2 }
        );
        setSound(sound);
        console.log('Playing Sound');
        //setIsPlaying(true);
        await sound.playAsync();

            setTimeout(() => setIsPlaying(false), 4000);
        //setTimeout(, 4000);
        }
     }

     async function pauseSound() {
             console.log('Pause Sound');
             if(isPlaying){
                await sound.stopAsync();
                setSound('')
                setIsPlaying(false)
             }
          }

  return (
    <Root>
      <ScrollView>
        <View style={styles.containCard}>
          <TouchableOpacity
            onPress={pickImage}
            style={{ overflow: "hidden", borderRadius: 100, marginRight: 10 }}
          >
            <Image
              source={
                imageUri
                  ? { uri: imageUri }
                  : require("../../../assets/icon.png")
              }
              style={styles.imagePicker}
            />
          </TouchableOpacity>
          <View style={{ flex: 1, margin: 1 }}>
            <Item>
              <Input
                placeholder="Name"
                value={userName}
                onChangeText={(name) => setUserName(name)}
                style={{ fontWeight: "bold" }}
              />
            </Item>
            <Item regular>
              <Textarea
                style={{ margin: 1, overflow: "scroll" }}
                rowSpan={3}
                placeholder="Description"
                value={nameDesc}
                onChangeText={(desc) => setNameDesc(desc)}
              />
            </Item>
          </View>
        </View>
        <View>
          <View
            style={{
              ...styles.containCard,
              flexDirection: "column",
              justifyContent: "center",
              height: 200,
              margin: 10,
              alignItems: "center",
              borderRadius: 15,
            }}
          >
            {onlineVideo ? (
              <Video
                ref={video}
                style={styles.videoPlayer}
                source={
                  videoUri
                    ? { uri: videoUri }
                    : require("../../../assets/icon.png")
                }
                useNativeControls
                onPlaybackStatusUpdate={(status) => setStatus(() => status)}
              />
            ) : (
              <Image
                source={require("../../../assets/icon.png")}
                style={{
                  alignSelf: "center",
                  height: 190,
                  width: 345,
                }}
              />
            )}
          </View>
          <TouchableOpacity
            style={{
              flex: 1, 
              alignSelf: 'center',
            }}
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
                  } else if (buttonIndex == 1) {
                    navigation.push("SettingsRecordingStack", {
                      onCameraVideo: onCameraVideo,
                    });
                  }
                }
              )
            }
          >
            <Text style={{color: 'black'}}>Edit Video</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.containCard}>

        <TouchableOpacity
           onPress={recording ? stopRecording : startRecording}>
            {isRecording?
            <Ionicons name="stop-circle-outline" size={60} color="red" />:
            <Ionicons name="mic-circle-outline" size={60} color="black" />
            }
       </TouchableOpacity>
      <TouchableOpacity
        onPress={isPlaying?pauseSound:playSound}>{isPlaying?
        <Ionicons name="stop-circle-outline" size={60} color="red" />:
        <Ionicons name="play-circle-outline" size={60} color="black" />
        }
      </TouchableOpacity>
        </View>
        {/* Button */}
        <View
          style={[
            styles.containCard,
            { alignSelf: "center", backgroundColor: "transparent" },
          ]}
        >
        </View>
        <TouchableOpacity
          style={{
            flex: 1,
            alignItems: "center",
            borderWidth: 1,
            backgroundColor: "black",
            padding: 10,
            borderRadius: 15,
            margin: 10,
          }}
          onPress={handleSaveButton}
          disabled={disableSave}
        >
          <Entypo name="save" size={24} color="white" />
        </TouchableOpacity>
      </ScrollView>
      <FloatingActionButton
        onPress={() => logout()}
        icon={<Icon name="exit" />}
      />
    </Root>
  );
};

const { width } = Dimensions.get("screen");
const imageSize = 120;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  textFooter1: {
    marginTop: 10,
  },
  imagePicker: {
    height: 100,
    width: 100,
    borderRadius: 100,
  },
  videoPlayer: {
    height: "100%",
    width: "100%",
    borderRadius: 15,
    overflow: "hidden",
    resizeMode: "contain",
  },
  SaveArea: {
    alignContent: "center",
    marginRight: 100,
    top: 100,
  },
  containCard: {
    flex: 1,
    flexDirection: "row",
    justifyContent:"center",
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
    marginRight: 0,
  },
  editIcons: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 15,
    alignItems: "center",
    padding: 10,
    margin: 2,
    width: 100,
    // borderRadius: 10,
    // paddingVertical: 5,
    // borderColor: "black",
    // justifyContent: "center",
    // borderWidth: 1,
    // marginRight: 10,
    // marginLeft: 10,
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

// export default Auth.user ? UserDetails : withAuthenticator(UserDetails);
export default UserDetails;
