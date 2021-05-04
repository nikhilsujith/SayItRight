import React, { useState, useEffect } from "react";
import {
  View,
  StatusBar,
  StyleSheet,
  Text,
  Image,
  Alert,
  Button,
} from "react-native";
import {
  Card,
  CardItem,
  Right,
  Left,
  Body,
  List,
  ListItem,
  Thumbnail,
  Icon,
} from "native-base";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import {
  exitGroup,
  fetchUsersInGroup,
  removeGroup,
  removeGroupMember,
} from "../../service/Group/GroupService";
import { AccordianPack, LoadingIndicator } from "../../components";
import { defaultOrImage } from "../../util";
import { currentSession } from "../../util/AmplifyCurrentSession";

const UsersInGroup = ({ navigation, route }) => {
  const { id, groupName, groupDesc, groupImage, owned } = route.params;
  const [users, setUsers] = useState("");
  const [groupOwner, setGroupOwner] = useState(false);
  const [groupNameState, setGroupNameState] = useState("My Groups");
  const currentUser = currentSession();

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

  const NameCard = ({ press, image, name, meaning, navigation, poolId }) => {
    let link = defaultOrImage(image);
    return (
      <TouchableOpacity
        onLongPress={() => {
          owned ? removeGroupMemberFunc(poolId) : null;
        }}
        onPress={() =>
          navigation.navigate("UserInformation", {
            userName: name,
            id: poolId,
          })
        }
      >
        <List style={{ padding: 10 }}>
          <ListItem thumbnail>
            <Left>
              <Thumbnail circular source={link} />
            </Left>
            <Body>
              <Text>{name}</Text>
            </Body>
          </ListItem>
        </List>
      </TouchableOpacity>
    );
  };

  const UserList = () => {
    return (
      <ScrollView>
        <View>
          {users.length > 0 ? (
            users.map((object) => {
              return (
                <NameCard
                  poolId={object.poolId}
                  image={object.profileImage}
                  name={object.fullName}
                  meaning={object.nameMeaning}
                  navigation={navigation}
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

  const exitGroupFunc = () => {
    Alert.alert("Are you sure you want to exit the group?", "", [
      {
        text: "OK",
        onPress: async () => {
          const response = await exitGroup(id, currentUser);
          const { status } = response;
          if (status == 200) {
            navigation.goBack();
          }
        },
      },
      {
        text: "Cancel",
      },
    ]);
  };

  const removeGroupFunc = () => {
    Alert.alert("Are you sure you want to delete the group?", "", [
      {
        text: "OK",
        onPress: async () => {
          const response = await removeGroup(id, currentUser);
          const { status } = response;
          if (status == 200) {
            navigation.goBack();
          }
        },
      },
      {
        text: "Cancel",
      },
    ]);
  };

  function removeGroupMemberFunc(user_poolId) {
    //console.log(x)
    Alert.alert(
      "Are you sure you want to remove this user from the group?",
      "",
      [
        {
          text: "OK",
          onPress: async () => {
            const response = await removeGroupMember(
              currentSession(),
              route.params.id,
              user_poolId
            );
            if (response.status == 200) {
              alert("User removed successfully!");
              navigation.goBack();
            }
          },
        },
        {
          text: "Cancel",
        },
      ]
    );
  }

  const accordContent = [{ title: "Group Members", content: <UserList /> }];
  const image = defaultOrImage(groupImage);
  return (
    <ScrollView>
      <View
        style={{
          ...styles.containCard
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
          marginTop: "5%",
        }}
      >
        {owned ? null : (
          <Button color="black" title="Exit Group" onPress={exitGroupFunc} />
        )}
        {owned ? (
          <Button
            color="black"
            title="Delete Group"
            onPress={removeGroupFunc}
          />
        ) : null}
        <Button
          color="black"
          title="Edit Group"
          onPress={() => alert("Function to edit group goes here")}
        />
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
  containCard: {
    flex: 1,
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
});
