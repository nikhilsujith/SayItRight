import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  Thumbnail,
  TouchableOpacity
} from 'react-native';
import {  Button } from 'react-native';
import { Video, Audio } from 'expo-av';
const defaultImage = {
    uri: "https://nik-dev-personal-bucket.s3.amazonaws.com/nikhilsujith-008.PNG",
  };

//export default class Profile extends Component {
function UserProfileCard({ audioLink, nameDescription, nameMeaning,cardImageLink,videoLink,title}) {
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
    const [soundtitle,setSoundTitle] = React.useState("Play Sound")
    console.log(audioLink);
    async function playSound() {
      if(sound === null)
      {
      // console.log('Loading Sound');
      const { sound } = await Audio.Sound.createAsync(
         {uri:'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'}
      );
      setSound(sound);
      setSoundTitle("Pause Sound");
      // console.log('Playing Sound');
      await sound.playAsync(); }
      else{
        setSound(null);
        setSoundTitle("Play Sound");
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
        {/* <Thumbnail square source={link} /> */}
        <Text style={styles.title}>{title}</Text>
        <Image source={link} resizeMode="cover" style={styles.userImage}></Image>
        {/* <Image style={styles.userImage} source={link}/> */}
              <Text style={styles.nameMeaning}>{nameMeaning}</Text>
              <Text style={styles.nameDescription}>{nameDescription}</Text> 
              {/* <View style={styles.container}> */}
              {/* <View style={styles.Audio} >
                   <Button title={soundtitle}onPress={playSound} />
              </View> */}
              <TouchableOpacity style={styles.saveButton} onPress={playSound}>
                   <Text style={styles.saveButtonText}>{soundtitle}</Text>
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
    {/* </View> */}
    </View>
    );
  }

//http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4
  //const { width } = Dimensions.get("screen");
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
      fontSize:25,
      fontWeight:'bold',
      marginTop:10,
    },
    container1: {
      flex: 1,
      justifyContent: 'center',
    },
    saveButtonText: {
      color: "black",
      fontSize: 30,
    },
  
    saveButton: {
      borderRadius: 50,
      width: 300,
      height: 60,
      // paddingHorizontal: 40,
      // paddingVertical: 5,
      borderColor: "#085DAD",
      alignItems: "center",
      justifyContent: "center",
      marginTop: 380,
      borderWidth: 1,
    },
    video: {
      alignSelf: 'center',
      width: 300,
      height: 180,
      position:'absolute',
      marginTop:475,
      backgroundColor:'white'
    },
    userImage: {
        width: 130,
        height: 130,
        borderRadius: 63,
        borderWidth: 4,
        borderColor: "white",
        marginBottom:10,
        alignSelf:'center',
        position: 'absolute',
        marginTop:80
      },

      userName:{
        fontSize:25,
        fontWeight:'600',
        marginTop:10,
        width:150,
        height:100,
        alignSelf:'center',
        position: 'absolute',
      },
    //   userName:{
    //     fontSize:28,
    //     color: "#696969",
    //     fontWeight: "600"
    //   },
      nameMeaning:{
        width: 300,
        height: 40,
        marginTop:250,
        fontSize:22,
        borderLeftWidth: 2,
        borderRightWidth: 2,
        borderTopWidth:2,
        borderBottomWidth: 2,
        borderColor:'white',
        backgroundColor:'white',
        alignSelf:'center',
        position: 'absolute',
      },
      nameDescription:{
        width: 300,
        height: 40,
        marginTop:300,
        fontSize:22,
        borderLeftWidth: 2,
        borderRightWidth: 2,
        borderTopWidth:2,
        borderBottomWidth: 2,
        borderColor:'white',
        backgroundColor:'white',
        alignSelf:'center',
        position: 'absolute',
      },
      buttonContainer: {
        marginTop:450,
        height:45,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom:20,
        width:250,
        borderRadius:30,
        backgroundColor: "#00BFFF",
        position: 'absolute',

      },
      buttonContainer2: {
        marginTop:550,
        height:45,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom:20,
        width:250,
        borderRadius:30,
        backgroundColor: "#00BFFF",
        position: 'absolute',        
      },
    });

export default UserProfileCard;
