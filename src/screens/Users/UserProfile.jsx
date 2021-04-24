import React, { component, useState, useEffect } from "react";
import { fetchEnrolledGroups } from "../../service/User/UserService";
import { View, StatusBar, StyleSheet } from "react-native";
import {
  Container,
  Header,
  Content,
  Card,
  CardItem,
  Icon,
  Right,
  Left,
  Body,
  List,
  ListItem,
  Thumbnail,
  Button,
  Text,
} from "native-base";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { LoadingIndicator } from "../../components";
import { theme } from "../../constants/theme";
import UserProfileCard from './UserProfileCard';


// const profiles = ({ userName, nameDesc, nameMeaning, userImage, id }) => {
//   return (
    
//       <UserProfileCard
//         key={id}
//         userName={userName}
//         nameDesc={nameDesc}
//         nameMeaning={nameMeaning}
//         userImage={userImage}
//       />
    
//   );
// };

const TempHeader = ({ navigation, title }) => {
    return (
      <Card style={styles.root}>
        <CardItem style={styles.root}>
          <Icon name="arrow-back" onPress={() => navigation.goBack()} />
          <Text
            style={{
              flex: 3,
              justifyContent: "space-between",
              marginLeft: 20,
              textAlign: "center",
              fontSize: 17,
              fontWeight: "700",
            }}
          >
            {title}
          </Text>
          <Right style={{ flex: 1, justifyContent: "flex-end" }}></Right>
        </CardItem>
      </Card>
    );
};

const UserProfile = ({ navigation,route }) => {
    // const [myGroups, setMyGroupData] = useState([]);
     const { profileImage,title,nameDescription,nameMeaning,videoLink,audioLink } = route.params;
  return (
      <>
    <TempHeader title="Details" navigation={navigation}/>

    <View>
   <UserProfileCard  title={title} cardImageLinks={profileImage} nameDescription={nameDescription} nameMeaning={nameMeaning} videoLink={videoLink} audioLink={audioLink}/> 
  </View>
  </>
  );
};

export default UserProfile;
const styles = StyleSheet.create({
    root: {
      borderRadius: 10,
      paddingLeft: 10,
    },
  });

