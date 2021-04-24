import React, { useState, useEffect } from "react";
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
import { fetchUsersInGroup } from "../../service/Group/GroupService";
import { LoadingIndicator } from "../../components";
import { fetchUser } from "../../service/User/UserService";

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

const defaultImage = {
  uri: "https://nik-dev-personal-bucket.s3.amazonaws.com/nikhilsujith-008.PNG",
};
const NameCard = ({ press, image, name, meaning }) => {
  let link = "";
  if (image) {
    link = { uri: image };
  } else {
    link = defaultImage;
  }
  return (
    <ScrollView>
      <TouchableOpacity onPress={press}>
        <List>
          <ListItem thumbnail>
            <Left>
              <Thumbnail square source={link} />
            </Left>
            <Body>
              <Text>{name}</Text>
              {/* <Text note numberOfLines={1}>
                {''}
              </Text> */}
            </Body>
            <Right></Right>
          </ListItem>
        </List>
      </TouchableOpacity>
    </ScrollView>
  );
};

const UsersInGroup = ({ navigation, route }) => {
  const { id, groupName } = route.params;
  const [users, setUsers] = useState("");
  const [groupNameState, setGroupNameState] = useState("My Groups");
  const [userNameData, setUserNameData] = useState("Userss");
// console.log(userNameData);
  
  useEffect(() => {
    let mounted = true;
    fetchUsersInGroup(id).then((userData) => {
      if (mounted) {
        setUsers(userData);
        setGroupNameState(groupName);
      }
    });
    return () => (mounted = false);
  }, []);
  useEffect(() => {
    let mounted1 = true;
    fetchUser().then((group) => {
      if (mounted1) {
        setUserNameData(group);
      }
    });
    return () => (mounted1 = false);
  }, []);
  return (
    <>
      <TempHeader navigation={navigation} title={groupNameState} />
      <ScrollView>
        {users.length > 0
          ? users.map((object) => {
              return (
                <NameCard
                  image={object.profileImage}
                  name={object.fullName}
                  meaning={object.poolId}
                  press={() =>navigation.navigate("UserProfile",{profileImage:object.profileImage,title:object.fullName,nameDescription:userNameData.desc,nameMeaning:"",videoLink:userNameData.videoFile,audioLink:userNameData.audioFile})}
                />
              );
            })
          : (<LoadingIndicator/>)}
      </ScrollView>
    </>
  );
};

export default UsersInGroup;
const styles = StyleSheet.create({
  root: {
    borderRadius: 10,
    paddingLeft: 10,
  },
});
