import React, { useState, useEffect } from "react";
import { Platform, View, Image, Text, SafeAreaView } from "react-native";
import { StyleSheet, Dimensions, Button, ScrollView } from "react-native";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { Audio, Video } from "expo-av";
import { VideoScreen } from "./VideoScreen";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import theme from "../../constants/theme";

import { logout } from "../../util/CustomAmplifyAuth";

import * as ImagePicker from "expo-image-picker";
import { imageUpload } from "../../service/ImageUpload.js";
import { uploadVideoAsync } from "../../service/User/VideoUpload";

import Rec from "./Rec";

import Amplify, { Auth } from 'aws-amplify';
import awsconfig from '../../aws-exports';
Amplify.configure(awsconfig);
import { withAuthenticator,Authenticator, SignIn, SignUp, ConfirmSignUp, Greetings } from 'aws-amplify-react-native';

import { NameCard } from "../../components";
// import { uploadVideoCamera } from "../../service/User/VideoCameraService";

const UserDetails = ({ navigation }) => {
  const [userName, setUserName] = useState("");
  const [nameDesc, setNameDesc] = useState("");
  const [nameMeaning, setNameMeaning] = useState("");
  const [imageUri, setImageUri] = useState(null);
  const [audioUri, setAudioUri] = useState(null);
  const [videoUri, setVideoUri] = useState(null);
  const [base64Image, setBase64Image] = useState(null);
  const [videoSource, setVideoSource] = useState(null);

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

  const handleSaveButton = () => {
    if (userName.length > 0 && nameDesc.length > 0) {
      imageUpload(imageUri, base64Image).then((result) => {
        if (result.status === 200) {
          alert("Image uploaded successfully");
        } else {
          alert(
            "Oops! There was an error uploading your details. Please try again later."
          );
        }
      });
      uploadVideoAsync(videoUri || videoSource, base64Image).then((result) => {
        if (result.status === 200) {
          alert("Video uploaded successfully");
        } else {
          alert(
            "Oops! There was an error uploading your details. Please try again later."
          );
        }
      });
      // uploadVideoCamera(videoSource, base64Image).then((result) => {
      //   if (result.status === 200) {
      //     alert("Video uploaded successfully");
      //   } else {
      //     alert(
      //       "Oops! There was an error uploading your details. Please try again later."
      //     );
      //   }
      // });
    }
  };

  const onAudioSelected = (uri) => {
      setVideoUri(uri);
      console.log(uri);
    };

  const onVideoSelected = (uri) => {
    setVideoUri(uri);
    console.log(uri);
  };

  const onCameraVideo = (uri) => {
    setVideoSource(uri);
    console.log(uri);
  };

  return (
    <View style={styles.container}>
      <View>
        <TouchableOpacity onPress={pickImage}>
          {imageUri ? (
            <Image
              source={{ uri: imageUri }}
              style={{
                height: 100,
                width: 100,
                borderRadius: 100,
                marginRight: 270,
                marginTop: 20,
              }}
            />
          ) : (
            <Image
              resizeMode="contain"
              style={{
                height: 100,
                width: 200,
                borderRadius: 10,
                marginRight: 270,
                marginTop: 20,
              }}
              source={require("../../../assets/icon.png")}
            />
          )}
        </TouchableOpacity>
      </View>
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
      <TextInput
        placeholder="Meaning of the Name"
        style={styles.input}
        value={nameMeaning}
        onChangeText={(val) => setNameMeaning(val)}
      />

      <TouchableOpacity style={styles.saveButton}
        onPress={() =>navigation.push("SettingsAudioStack", {
          onAudioSelected: onAudioSelected,
        })}>
        <Text style={styles.saveButtonText}>Audio</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.saveButton}
        onPress={() =>
          navigation.push("SettingsVideoStack", {
            onVideoSelected: onVideoSelected,
          })
        }
      >
        <Text style={styles.saveButtonText}>Video</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={{ ...styles.saveButton, opacity: disableSave ? 0.5 : 1 }}
        onPress={handleSaveButton}
        disabled={disableSave}
      >
        <Text style={styles.saveButtonText}>Save</Text>
      </TouchableOpacity>

      {/* Hey Deeksha, take a look at this */}
      <TouchableOpacity
        onPress={() => alert('Split this navigation between 2 buttons :)')}
        style={[
          styles.SignInForm,
          {
            borderColor: 'black',
            borderWidth: 1,
            marginTop: 15,
          },
        ]}
      >
        <Text
          style={[
            styles.textSign,
            {
              color: 'black',
            },
          ]}
        >
          AUDIO ICON | VIDEO ICON
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
              style={styles.saveButton}
              onPress={() => logout()}
            >
              <Text style={styles.saveButtonText}>Logout</Text>
            </TouchableOpacity>
    </View>
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

  action: {
    height: 50,
  },
  textInput1: {
    marginBottom: 10,
  },

  saveButtonText: {
    color: "#085DAD",
    fontSize: 20,
  },

  saveButton: {
    borderRadius: 50,
    paddingHorizontal: 40,
    paddingVertical: 5,
    borderColor: "#085DAD",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    borderWidth: 1,
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

export default (Auth.user)?UserDetails:withAuthenticator(UserDetails);
