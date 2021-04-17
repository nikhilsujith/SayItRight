import React, { useState, useEffect } from 'react';
import { View, Text, Platform, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { TouchableOpacity } from 'react-native-gesture-handler';
// import uploadVideoAsync from '../service/UploadVideoService';
import { Video } from 'expo-av';

import Amplify, { Auth } from 'aws-amplify';
import awsconfig from '../../aws-exports';
Amplify.configure(awsconfig);
import { withAuthenticator,Authenticator, SignIn, SignUp, ConfirmSignUp, Greetings } from 'aws-amplify-react-native';


const VideoScreen = ({ navigation, route}) => {
  const [videoUri, setVideoUri] = useState(null);
  const [base64Image, setBase64Image] = useState(null);
  const [videoSource, setVideoSource] = useState(null);

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
  }, []);

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

  const onCameraVideo = (uri) => {
    setVideoSource(uri);
    console.log(uri);
  };


  const handleSaveButton = () => {
    route.params.onVideoSelected(videoUri || videoSource);
    navigation.pop()
  };


  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.Gallery}
        onPress={() => {
          pickVideo();
        }}
      >
        <Text style={styles.saveButtonText}>Video from Gallery</Text>
        <Video source={{ uri: videoUri }} style={{ width: 200, height: 200 }} />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.saveButton}
        onPress={() => navigation.push("SettingsRecordingStack", {onCameraVideo: onCameraVideo})}
      >
        <Text style={styles.saveButtonText}>Video from Camera</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.saveButton} onPress={handleSaveButton}>
        <Text style={styles.saveButtonText}>Save</Text>
      </TouchableOpacity>
    </View>
  );
};

export default (Auth.user)?VideoScreen:withAuthenticator(VideoScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#085DAD',
    fontSize: 20,
  },
  saveButton: {
    borderRadius: 50,
    paddingHorizontal: 40,
    paddingVertical: 5,
    borderColor: '#085DAD',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    borderWidth: 1,
  },
  Gallery: {
    borderRadius: 50,
    paddingHorizontal: 40,
    paddingVertical: 5,
    borderColor: '#085DAD',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 200,
    borderWidth: 1,
  },
});
