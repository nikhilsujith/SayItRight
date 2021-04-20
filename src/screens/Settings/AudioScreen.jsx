import React, { useState, useEffect } from 'react';
import { View, Text, Platform, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { TouchableOpacity } from 'react-native-gesture-handler';
// import uploadVideoAsync from '../service/UploadVideoService';
import { Audio,Video } from 'expo-av';
import { RNS3 } from 'react-native-s3-upload';
import { currentSession } from "../../util/AmplifyCurrentSession";

import Amplify, { Auth } from 'aws-amplify';
import awsconfig from '../../aws-exports';
Amplify.configure(awsconfig);
import { withAuthenticator,Authenticator, SignIn, SignUp, ConfirmSignUp, Greetings } from 'aws-amplify-react-native';

const AudioScreen = ({ navigation, route}) => {
    const poolId=currentSession();
    const [audioFile, setAudioFile] = useState('');
    const [audioUri, setAudioUri] = useState(null);
    const [recording, setRecording] = useState('');
    const [isRecording, setIsRecording] = useState(false);
    const [audioDuration, setAudioDuration] = useState('');
    const [isPlaying, setIsPlaying] = useState(false);
    const [sound, setSound] = useState('');
    const [isRecordModalVisible, setRecordModalVisible] = useState(false);
    const [isPlayModalVisible, setPlayModalVisible] = useState(false);

//   useEffect(() => {
//     (async () => {
//       if (Platform.OS !== 'web') {
//         const {
//           status,
//         } = await ImagePicker.requestMediaLibraryPermissionsAsync();
//         if (status !== 'granted') {
//           alert('Sorry, we need camera roll permissions to make this work!');
//         }
//       }
//     })();
//   }, []);

      const handleCloseButton = () => {
        route.params.onAudioSelected(audioUri);
        navigation.pop()
      };

    const toggleRecordModal = () => {
      setRecordModalVisible(!isRecordModalVisible);
    };

    const togglePlayModal = () => {
          setPlayModalVisible(!isPlayModalVisible);
        };

 const file = {
    // `uri` can also be a file system path (i.e. file://)
    uri: audioFile,
    name: poolId+"_audio.caf",
    type: "audio/x-caf"
  }

   const options = {
      keyPrefix: "audio/",
      bucket: "amplify-sayitright-dev-141916-deployment",
      region: "us-east-2",
      accessKey: "AKIAYXRZLB7D4SBCJ7OY",
      secretKey: "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",
      successActionStatus: 201
    }
      const uploadS3 = () => {
        RNS3.put(file, options).then(response => {
             //console.log(response)
             if (response.status !== 201)
               throw new Error("Failed to upload image to S3");
             //console.log(response.body.location);
             setAudioUri(response.body.location)
             //console.log(response.body);
             navigation.pop()
             /**
              * {
              *   postResponse: {
              *     bucket: "your-bucket",
              *     etag : "9f620878e06d28774406017480a59fd4",
              *     key: "uploads/image.png",
              *     location: "https://your-bucket.s3.amazonaws.com/uploads%2Fimage.png"
              *   }
              * }
              */
           });
      };

  async function startRecording() {
    setIsRecording(true)
    try {
      //console.log('Requesting permissions..');
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });
      //console.log('Starting recording..');
      const recording = new Audio.Recording();
      await recording.prepareToRecordAsync(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY);
      await recording.startAsync();
      setRecording(recording);
      //console.log('Recording started');
    } catch (err) {
      console.error('Failed to start recording', err);
    }
  }

  async function stopRecording() {
    setIsRecording(false)
    //console.log('Stopping recording..');
    setRecording(undefined);
    await recording.stopAndUnloadAsync();
    const uri = recording.getURI();
    setAudioFile(recording.getURI());
    setAudioDuration(recording.durationMillis)
//    const { dir_sound } = await this.recording.createNewLoadedSoundAsync
//    setSound(dir_sound);
    //console.log('Recording stopped and stored at', uri);
  }

  async function playSound() {
      //console.log('Loading Sound');
      const file_path2=audioFile.toString()
              const { sound } = await Audio.Sound.createAsync(
                 { uri: file_path2 }
              );
      setSound(sound);
      //console.log('Playing Sound');
      //setIsPlaying(true);
      await sound.playAsync();
      //setIsPlaying(false);
      }

  async function playOnlineSound() {
        //console.log('Loading Online Sound');
                const { sound } = await Audio.Sound.createAsync(
                   { uri: "https://s3.us-east-2.amazonaws.com/amplify-sayitright-dev-141916-deployment/audio/"+poolId+"_audio.caf" }
                );
      //console.log('Playing Online Sound');
      await sound.playAsync(); }

  return (
    <View style={styles.container}>
      <Text style={[styles.liveText]}>{isRecording ? "LIVE" : ""}
      </Text>
       <TouchableOpacity
         onPress={recording ? stopRecording : startRecording}>
         <Text style={styles.actionText}>{recording ? 'Stop Recording' : 'Start Recording'}
         </Text>
       </TouchableOpacity>
       <Text style={[styles.liveText]}>{isPlaying ? "PLAYING" : ""}</Text>
        <TouchableOpacity
          onPress={playSound}>
          <Text style={styles.actionText}>Play Sound
          </Text>
        </TouchableOpacity>
      <TouchableOpacity style={styles.saveButton} onPress={uploadS3}>
        <Text style={styles.saveButtonText}>Upload S3</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.saveButton} onPress={playOnlineSound}>
              <Text style={styles.saveButtonText}>Play Online Sound</Text>
      </TouchableOpacity>
    </View>
  );
};

export default (Auth.user)?AudioScreen:withAuthenticator(AudioScreen);

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
  liveText: {
     color: 'red',
  },
  actionText:{
     color:'black'
  },
});
