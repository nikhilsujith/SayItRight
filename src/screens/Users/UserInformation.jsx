import { Input, Item, Textarea } from "native-base";
import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { Audio, Video, AVPlaybackStatus } from "expo-av";
import { getUser } from "../../service/User/UserService";
import Amplify, { Auth } from "aws-amplify";
import awsconfig from "../../aws-exports";
import { getUserByPoolId } from "../../service/User/UserService";
import { MaterialIcons,Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";

Amplify.configure(awsconfig);

const UserInformation = ({ navigation, route }) => {
  const [userName, setUserName] = useState("");
  const [onlineVideo, setOnlineVideo] = useState("");
  const [nameDesc, setNameDesc] = useState("");
  const [nameMeaning, setNameMeaning] = useState("");
  const [imageUri, setImageUri] = useState(null);
  const [audioUri, setAudioUri] = useState(null);
  const [audioS3Loc, setAudioS3Loc] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  const [sound, setSound] = useState('');
  const video = React.useRef(null);
  const [status, setStatus] = React.useState({});
  const { id } = route.params;

  useEffect(() => {
    (async () => {
      const fetchedPosts = await getUserByPoolId(id);
      if (fetchedPosts.status != "500") {
        setAudioS3Loc(fetchedPosts.body.audioFile);
        setNameDesc(fetchedPosts.body.desc);
        setNameMeaning(fetchedPosts.body.nameMeaning);
        setUserName(fetchedPosts.body.fullName);
        setImageUri(fetchedPosts.body.profileImage);
        setOnlineVideo(fetchedPosts.body.videoFile);
      }
    })();
  }, []);

 async function playSound() {
     if(audioS3Loc!=''){
         console.log('Loading Sound');
         setIsPlaying(true)
         //console.log(audioS3Loc)
         const file_path2=(audioS3Loc);
         //console.log(file_path2)
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
    <View style={{ flex: 1 }}>
      <View style={{ ...styles.containCard }}>
        <Image
          source={
            imageUri ? { uri: imageUri } : require("../../../assets/icon.png")
          }
          style={{
            height: 100,
            width: 100,
            borderRadius: 100,
          }}
        />
        <View style={{margin: 10}}>
          <Text>{nameDesc}</Text>
        </View>
      </View>

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
            style={{ ...styles.videoPlayer }}
            source={{
              uri: onlineVideo,
            }}
            useNativeControls
            resizeMode="contain"
            isLooping
            onPlaybackStatusUpdate={(status) => setStatus(() => status)}
          />
        ) : (
          <Image
            source={require("../../../assets/icon.png")}
            style={{
              alignSelf: "center",
              height: 190,
              width: 345,
              resizeMode: "cover",
            }}
          />
        )}
      </View>
      <View style={[styles.containCard,{justifyContent:"center"}]}>
        <TouchableOpacity
          onPress={isPlaying?pauseSound:playSound}>{isPlaying?
          <Ionicons name="stop-circle-outline" size={60} color="red" />:
          <Ionicons name="play-circle-outline" size={60} color="black" />
          }
        </TouchableOpacity>
       </View>
    </View>
  );
};

export default UserInformation;

const styles = StyleSheet.create({
  containCard: {
    flexDirection: "row",
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
  videoPlayer: {
    height: "100%",
    width: "100%",
    borderRadius: 15,
    overflow: "hidden",
    resizeMode: "contain",
  },
});
