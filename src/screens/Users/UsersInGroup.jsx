import React, { useState, useEffect } from "react";
import { View, StatusBar, StyleSheet, Button, Text, Image } from "react-native";
import {
  Card,
  CardItem,
  Right,
  Left,
  Body,
  List,
  ListItem,
  Thumbnail,
} from "native-base";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { fetchUsersInGroup } from "../../service/Group/GroupService";
import { AccordianPack, LoadingIndicator } from "../../components";
import { defaultOrImage } from "../../util";
import { getUserByPoolId } from "../../service/User/UserService";
import { currentSession } from "../../util/AmplifyCurrentSession";

const GroupHeader = ({ navigation, title }) => {
  return (
    <Card style={styles.root}>
      <CardItem style={styles.root}>
        {/* <Left>
          <Icon name="close" onPress={() => navigation.goBack()} />
        </Left> */}
        <Body
          style={{ flex: 5, alignItems: "center", justifyContent: "center" }}
        >
          <Text>{title}</Text>
        </Body>
        {/* <Right style={{ flex: 1 }}>
          <Icon name="close" onPress={() => navigation.goBack()} />
        </Right> */}
      </CardItem>
    </Card>
  );
};

const NameCard = ({ press, image, name, meaning }) => {
  let link = defaultOrImage(image);
  return (
    <TouchableOpacity onPress={press} style={{ padding: 10 }}>
      <List>
        <ListItem thumbnail>
          <Left>
            <Thumbnail circular source={link} />
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
  );
};

const UsersInGroup = ({ navigation, route }) => {
  const { id, groupName, groupDesc, groupImage } = route.params;
  const [users, setUsers] = useState("");
  const fetchUser = getUserByPoolId(currentSession());
  const [groupNameState, setGroupNameState] = useState("My Groups");


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

  const UserList = () => {
    return (
      <ScrollView>
        <View>
          {users.length > 0 ? (
            users.map((object) => {
              return (
                <NameCard
                  image={object.profileImage}
                  name={object.fullName}
                  meaning={object.poolId}
                  press={() =>navigation.navigate("UserProfile",{profileImage:object.profileImage,title:object.fullName,nameDescription:fetchUser._W.body.desc,nameMeaning:object.fullName,videoLink:fetchUser._W.body.videoFile,audioLink:fetchUser._W.body.audioFile})}
                />
              );
            })
          ) : (
            <LoadingIndicator />
          )}
        </View>
      </ScrollView>
    );
  };

  const accordContent = [
    { title: "Group Members", content: <UserList /> },
];
  const image = defaultOrImage(groupImage);
  return (
    <ScrollView>
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          flexWrap: "wrap",
          alignItems: "flex-start",
        }}
      >
        <Image style={styles.imagePicker} source={image} />
        <View
          style={{
            flex: 1,
            justifyContent: "flex-start",
            marginTop: "5%",
            marginBottom: "5%",
          }}
        >
          <Text>{groupDesc}</Text>
        </View>
      </View>
      <AccordianPack headerTitles={accordContent} />
      <View
        style={{
          flex: 1,
          justifyContent: "flex-start",
          marginTop: "5%",
          marginBottom: "5%",
        }}
      >
        <Button color="black" title="Exit Group" onPress={() => alert('Create backend to exit group')}/>
      </View>
    </ScrollView>
  );
};

export default UsersInGroup;

const styles = StyleSheet.create({
  root: {
    borderRadius: 10,
    paddingLeft: 10,
  },
  imagePicker: {
    height: 100,
    width: 100,
    borderRadius: 100,
    resizeMode: "cover",
    backgroundColor: "#dfdfdf",
    paddingTop: 30,
    margin: 10,
  },
});
