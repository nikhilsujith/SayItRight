import React, { useState, useEffect } from "react";
import { View, StatusBar, StyleSheet, Button, Text, Image } from "react-native";
import {
  Container,
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
} from "native-base";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { fetchUsersInGroup } from "../../service/Group/GroupService";
import { AccordianPack, GroupCard, LoadingIndicator } from "../../components";

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
                  press={() => alert("pressed")}
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

  const accordContent = [{ title: "Group Members", content: <UserList /> }];

  return (
    <ScrollView>
      <View style={{ flex: 1, alignItems: "center" }}>
        <Image style={styles.imagePicker} source={defaultImage} />
        <View style={{flex: 1, justifyContent: 'flex-start', marginTop: '5%', marginBottom: '5%'}}>
          <Text>{groupName}</Text>
          <Text>{groupDesc}</Text>
        </View>
      </View>
      <Button title="Exit Group" />
      <AccordianPack headerTitles={accordContent} />
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
    height: 150,
    width: 150,
    borderRadius: 100,
    marginTop: 10,
    resizeMode: "cover",
    backgroundColor: "red",
    paddingTop: 30,
    marginRight: 0,
  },
});
