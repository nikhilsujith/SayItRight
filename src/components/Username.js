import React, { useState, useEffect } from "react";
import { Platform, View, Image, Text } from "react-native";
import { StyleSheet, Dimensions, Button } from "react-native";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { Video } from "expo-av";

import * as ImagePicker from "expo-image-picker";
import imageUpload from "../service/ImageUpload";

const Username = (props) => {
  const [userName, setUserName] = useState("");
  const [nameDesc, setNameDesc] = useState("");
  const [nameMeaning, setNameMeaning] = useState("");
  const [imageUri, setImageUri] = useState(null);
  const [videoUri, setVideoUri] = useState(null);
  const [base64Image, setBase64Image] = useState(null);

  const disableSave =
    userName === "" ||
    nameDesc === "" ||
    nameMeaning === "" ||
    !imageUri ||
    !videoUri;

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

  const pickVideo = async () => {
    let result2 = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
      allowsEditing: true,
      aspect: [4, 3],
      base64: true,
    });

    // console.log(result);

    if (!result2.cancelled) {
      setVideoUri(result2.uri);
      setBase64Image(result2.base64);
    }
  };
  console.log(videoUri);

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
    }
  };

  return (
    <View style={styles.container}>
      <View>
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <TouchableOpacity onPress={pickImage}>
            {imageUri ? (
              <Image
                source={{ uri: imageUri }}
                style={{ width: 200, height: 200 }}
              />
            ) : (
              <Image
                source={require("../../assets/icon.png")}
                style={{ width: 200, height: 200 }}
                resizeMode="contain"
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
      </View>

      <TouchableOpacity style={styles.saveButton} onPress={handleSaveButton}>
        <Text style={styles.saveButtonText}>Audio</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.saveButton}
        onPress={() => {
          console.log("::::::::::", props.navigation);
          props.navigation.push("Recording");
        }}
      >
        <Text style={styles.saveButtonText}>Video from Camera</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.saveButton}
        onPress={() => {
          pickVideo();
          console.log("::::::::::", props.navigation);
          props.navigation.push("Player");
        }}
      >
        <Text style={styles.saveButtonText}>Video from Gallery</Text>
        <Video source={{ uri: videoUri }} style={{ width: 200, height: 200 }} />
      </TouchableOpacity>

      <TouchableOpacity
        style={{ ...styles.saveButton, opacity: disableSave ? 0.5 : 1 }}
        onPress={handleSaveButton}
        disabled={disableSave}
      >
        <Text style={styles.saveButtonText}>Save</Text>
      </TouchableOpacity>
      {/* <Rec></Rec> */}
    </View>
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
});

export default Username;
