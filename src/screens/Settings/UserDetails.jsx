import React, { useState, useEffect } from "react";
import { Platform, View, Image, Text, SafeAreaView } from "react-native";
import { StyleSheet, Dimensions, Button, ScrollView } from "react-native";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { Fab } from "native-base";
import { theme } from "../../constants/theme";

import { MaterialIcons } from "@expo/vector-icons";
import { Foundation } from "@expo/vector-icons";
import { logout } from "../../util/CustomAmplifyAuth";

import * as ImagePicker from "expo-image-picker";
import { imageUpload } from "../../service/User/ImageUpload";
import { uploadVideoAsync } from "../../service/User/VideoUpload";

import Amplify, { Auth } from "aws-amplify";
import awsconfig from "../../aws-exports";
Amplify.configure(awsconfig);
import { withAuthenticator } from "aws-amplify-react-native";

import { FloatingActionButton, NameCard } from "../../components";

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

  return (
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
        <TextInput
          placeholder="Meaning of the Name"
          style={styles.input}
          value={nameMeaning}
          onChangeText={(val) => setNameMeaning(val)}
        />
      </View>
      <View style={styles.button}>
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
      <View style={styles.SaveArea}>
        <TouchableOpacity
          style={{ ...styles.saveButton, opacity: disableSave ? 0.5 : 1 }}
          onPress={handleSaveButton}
          disabled={disableSave}
        >
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>
      </View>
      <View style={{ flex: 1 }}>
        <FloatingActionButton
          onPress={() => logout()}
          icon={<MaterialIcons name="logout" size={24} color="black" />}
        />
      </View>
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

  SaveArea: {
    alignContent: "center",
    marginRight: 150,
  },

  Logout: {
    position: "absolute",
    top: 100,
    left: 130,
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

  action: {
    height: 50,
  },
  textInput1: {
    marginBottom: 10,
  },
  button: {
    flexDirection: "row",
    marginTop: 100,
  },

  saveButton: {
    position: "absolute",
    bottom: 50,
    borderRadius: 10,
    paddingHorizontal: 70,
    paddingVertical: 5,
    borderColor: "black",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    marginRight: 10,
  },
  audioIcon: {
    borderRadius: 10,
    paddingHorizontal: 40,
    paddingVertical: 5,
    borderColor: "black",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 5,
    marginBottom: 100,

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
