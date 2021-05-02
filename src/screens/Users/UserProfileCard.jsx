import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  Thumbnail,
  TouchableOpacity,
  Animated,
  PanResponder,
  Easing
} from 'react-native';
import { Entypo } from '@expo/vector-icons';
import {  Button } from 'react-native';
import { Video, Audio } from 'expo-av';
const defaultImage = {
    uri: "https://nik-dev-personal-bucket.s3.amazonaws.com/nikhilsujith-008.PNG",
  };

  const TRACK_SIZE = 4;
  const THUMB_SIZE = 20;  
//export default class Profile extends Component {
function UserProfileCard({ title, cardImageLink, audioLink, nameDescription, nameMeaning,videoLink,}) {
    let link = "";
    if (cardImageLink) {
      if (cardImageLink.length > 0) {
        link = { uri: cardImageLink };
      }
    } else {
      link = defaultImage;
    }
    const video = React.useRef(null);
    const [status, setStatus] = React.useState({});
    const [sound, setSound] = React.useState();
    const [soundtitle,setSoundTitle] = React.useState("Play Sound");
    const [play,setPlay] =React.useState(false);
    console.log(audioLink);
    async function playSound() {
      if(sound === null)
      {
      // console.log('Loading Sound');
      const { sound } = await Audio.Sound.createAsync(
         {uri:'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'}
      );
      setSound(sound);
      setPlay(true);
      setSoundTitle("Pause Sound");
      // console.log('Playing Sound');
      await sound.playAsync(); }
      else{
        setSound(null);
        setSoundTitle("Play Sound");
        setPlay(false);
      }
    }

    React.useEffect(() => {
      return sound
        ? () => {
            // console.log('Unloading Sound');
            sound.unloadAsync(); }
        : undefined;
    }, [sound]);
  return (
     
    <View style={[styles.container]}>
        <Text style={styles.title}>{title}</Text>
        <Image source={link} resizeMode="cover" style={styles.userImage}></Image>
              <Text style={styles.nameMeaning}>{nameMeaning}</Text>
              <Text style={styles.nameDescription}>{nameDescription}</Text> 
              <TouchableOpacity style={styles.audioButton} onPress={playSound} >
                   <Entypo name={play? "controller-paus" : "controller-play"} color='black' size={40} />
              </TouchableOpacity>
              <Video
                ref={video}
                style={styles.video}
                source={{
                  uri: videoLink,
                }}
                useNativeControls
                resizeMode="contain"
                isLooping
                onPlaybackStatusUpdate={status => setStatus(() => status)}
              />
    </View>
    );
  }
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
    },
    title:{
      width: 150,
      height: 40,
      alignSelf:'center',
      position: 'absolute',
      fontSize:30,
      fontWeight:'bold',
      marginTop:10,
    },
    container1: {
      flex: 1,
      justifyContent: 'center',
    },
    audioButton: {
      borderRadius: 50,
      width: 300,
      height: 45,
      // paddingHorizontal: 40,
      // paddingVertical: 5,
      borderColor: 'black',
      alignItems: "center",
      justifyContent: "center",
      marginTop: 325,
      borderWidth: 1,
    },
    video: {
      alignSelf: 'center',
      width: 300,
      height: 170,
      position:'absolute',
      marginTop:415,
      backgroundColor:'black'
    },
    userImage: {
        width: 160,
        height: 160,
        borderRadius: 100,
        borderWidth: 4,
        borderColor: "white",
        marginBottom:10,
        alignSelf:'center',
        position: 'absolute',
        marginTop:30
      },

      // userName:{
      //   fontSize:25,
      //   fontWeight:'600',
      //   marginTop:10,
      //   width:150,
      //   height:100,
      //   alignSelf:'center',
      //   position: 'absolute',
      // },
    //   userName:{
    //     fontSize:28,
    //     color: "#696969",
    //     fontWeight: "600"
    //   },
      nameMeaning:{
        width: 300,
        height: 40,
        marginTop:220,
        fontSize:18,
        // borderLeftWidth: 2,
        // borderRightWidth: 2,
        // borderTopWidth:2,
        // borderBottomWidth: 2,
        // borderColor:'white',
        //backgroundColor:'white',
        alignSelf:'center',
        textAlign: 'center',
        position: 'absolute',
      },
      nameDescription:{
        width: 320,
        height: 110,
        marginTop:260,
        fontSize:18,
        // borderRightWidth: 2,
        // borderTopWidth:2,
        // borderBottomWidth: 2,
        // borderColor:'white',
        // backgroundColor:'white',
        alignSelf:'center',
        textAlign: 'center',
        position: 'absolute',
      },
      
    });

export default UserProfileCard;
