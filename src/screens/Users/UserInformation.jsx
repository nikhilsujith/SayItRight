import { Input, Item, Textarea } from "native-base";
import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { Video, AVPlaybackStatus } from "expo-av";

const imageUri ="https://nik-dev-personal-bucket.s3.amazonaws.com/say-it-right-icon.png";
const onlineVideo = "http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4";

const UserInformation = ({ navigation, route }) => {
  const video = React.useRef(null);
  const [status, setStatus] = React.useState({});
  const { id } = route.params;

//   User Pool ID
  console.log("USE THIS POOL ID TO MAKE REQUESTS TO THE SERVICE. Use the service to fetch /api/v1/user/{poolId}" + id)

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
        <View style={{ flex: 1, margin: 1 }}>
          <Text>
            afdasd fasdf asdf asdf asdfa sdfa sdfas dfasd fasd fasdf asdf asdf
            asdf asdf asdf
          </Text>
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
      <View style={{...styles.containCard}}>
        <Text>Audio Goes Here</Text>
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
