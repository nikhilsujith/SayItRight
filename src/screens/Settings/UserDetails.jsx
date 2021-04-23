import React, { useState, useEffect } from "react";
import {
  Platform,
  View,
  Image,
  Text,
  SafeAreaView,
} from "react-native";
import { StyleSheet, Dimensions, Button, ScrollView } from "react-native";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { MaterialIcons } from "@expo/vector-icons";
import { Foundation } from "@expo/vector-icons";
import { logout } from "../../util/CustomAmplifyAuth";
import { Entypo } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { imageUpload } from "../../service/User/ImageUpload";
import { uploadVideoAsync } from "../../service/User/VideoUpload";
import { uploadAuido } from "../../service/User/Audio";
import Amplify, { Auth } from "aws-amplify";
import awsconfig from "../../aws-exports";
Amplify.configure(awsconfig);


import { FloatingActionButton } from "../../components";

const window = Dimensions.get("window");
const screen = Dimensions.get("screen");

const UserDetails = ({ navigation }) => {
  const [userName, setUserName] = useState("");
  const [nameDesc, setNameDesc] = useState("");
  const [imageUri, setImageUri] = useState(null);
  const [videoUri, setVideoUri] = useState(null);
  const [base64Image, setBase64Image] = useState(null);
  const [videoSource, setVideoSource] = useState(null);
  const [audioUri, setAudioUri] = useState(null);
  const [dimensions, setDimensions] = useState({ window, screen });

  const disableSave = userName === "" || nameDesc === "" || !imageUri;

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
    Dimensions.addEventListener("change", onChange);
    return () => {
      Dimensions.removeEventListener("change", onChange);
    };
  }, []);

  const onChange = ({ window, screen }) => {
    setDimensions({ window, screen });
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

  const handleSaveButton = () => {
    console.log(":::::::::::HANDLE SAVE:::::::::");
    if (userName.length > 0 && nameDesc.length > 0) {
      imageUpload(imageUri, base64Image).then((result) => {
        if (result.status === 200) {
          alert("Image uploaded successfully");
        } else {
          alert(
            "Oops! There was an error uploading your Image. Please try again later."
          );
        }
      });
      uploadVideoAsync(videoUri || videoSource, base64Image).then((result) => {
        if (result.status === 200) {
          alert("Video uploaded successfully");
        } else {
          alert(
            "Oops! There was an error uploading your Video. Please try again later."
          );
        }
      });
      uploadAuido(audioUri).then((result) => {
        if (result.status === 200) {
          alert("Audio uploaded successfully");
        } else {
          alert(
            "Oops! There was an error uploading your Audio. Please try again later."
          );
        }
      });
    }
  };

  const onAudioSelected = (uri) => {
    setAudioUri(uri);
    console.log(uri);
  };

  const onVideoSelected = (uri) => {
    setVideoUri(uri);
    console.log(uri);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView style={{ alignSelf: "center" }}>
        <View style={{ flex: 1, alignItems: "center" }}>
          <TouchableOpacity onPress={pickImage}>
            {imageUri ? (
              <Image
                source={{ uri: imageUri }}
                // style={{
                // height: 150,
                // width: 150,
                // paddingTop: 30,
                // borderRadius: 100,
                // marginRight: 0,
                // marginTop: 30,
                // }}
                style={styles.imagePicker}
              />
            ) : (
              <Image
                resizeMode="contain"
                style={styles.imagePicker}
                source={require("../../../assets/icon.png")}
              />
            )}
          </TouchableOpacity>
        </View>
        <View>
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
        <View style={styles.avView}>
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
            style={styles.videoIcon}
            onPress={() =>
              navigation.push("SettingsVideoStack", {
                onVideoSelected: onVideoSelected,
              })
            }
          >
            <Foundation name="video" size={24} color="black" />
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity
            style={{
              ...styles.saveButton,
              opacity: disableSave ? 0.5 : 1,
            }}
            onPress={handleSaveButton}
            disabled={disableSave}
          >
            <Entypo name="save" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </ScrollView>
      <View>
        <FloatingActionButton
          onPress={() => logout()}
          icon={<MaterialIcons name="logout" color="black" />}
        />
      </View>
    </SafeAreaView>
  );
  return (
    <SafeAreaView>
      <Text>Oops, something went wrong</Text>
    </SafeAreaView>
  );
};

const { width, height } = Dimensions.get("screen");
const imageHeight = height * 0.2;
const imageWidth = height * 0.2;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  imagePicker: {
    height: imageHeight,
    margin: height * 0.02,
    width: imageWidth,
    paddingTop: 30,
    borderRadius: 100,
    marginRight: 0,
  },
  input: {
    borderColor: "black",
    borderBottomWidth: 0.5,
    paddingVertical: 10,
    paddingHorizontal: 10,
    marginTop: 30,
    elevation: 10,
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
  button: {
    flexDirection: "row",
    marginTop: 30,
  },
  saveButton: {
    backgroundColor: "black",
    borderRadius: 10,
    paddingVertical: 5,
    borderColor: "black",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    marginTop: height * 0.06,
  },
  avView: {
    flex: 1,
    flexDirection: "row",
    alignSelf: "center",
    marginTop: height * 0.1,
  },
  audioIcon: {
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    paddingHorizontal: width * 0.16,
    paddingVertical: 5,
    borderColor: "black",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    elevation: 10,
  },
  videoIcon: {
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    paddingHorizontal: width * 0.16,
    paddingVertical: 5,
    borderColor: "black",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    elevation: 10,
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
