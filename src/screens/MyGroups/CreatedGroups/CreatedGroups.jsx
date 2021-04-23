import React, { useState, useEffect } from "react";
import { View, Text, Button, Footer, Icon, Fab } from "native-base";
import { FloatingActionButton, GroupCard } from "../../../components";
import { fetchCreatedGroups } from "../../../service/User/UserService";
import { createStackNavigator } from "@react-navigation/stack";
import { TouchableOpacity } from "react-native-gesture-handler";

const MainStack = createStackNavigator();

const groupCards = ({ cardTitle, cardDesc, cardImageLink, id }) => {
  // console.log(cardImageLink);
  const x =
    "https://say-it-right-bucket.s3.amazonaws.com/testPool/test.jpeg-882943ae-9e92-4458-9f5e-25406adfb02d";
  return (
    <TouchableOpacity
      onLongPress={() =>
        alert(
          "Make a POST request to delete record from DB + immediate refresh to update UI"
        )
      }
    >
      <GroupCard
        key={id}
        cardTitle={cardTitle}
        cardDesc={cardDesc}
        cardImageLink={x}
      />
    </TouchableOpacity>
  );
};

const MyGroupsScreen = ({ navigation, createdGroups }) => {
  return (
    <View>
      {createdGroups &&
        createdGroups.map(({ groupName, groupDesc, groupImage, id }) => {
          return groupCards({
            cardTitle: groupName,
            cardDesc: groupDesc,
            cardImageLink: groupImage,
            id: id,
          });
        })}
    </View>
  );
};

function ModalScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text style={{ fontSize: 30 }}>This is a modal!</Text>
      <Button onPress={() => navigation.goBack()} title="Dismiss" />
    </View>
  );
}
function MainStackScreen() {
  return (
    <MainStack.Navigator>
      <MainStack.Screen
        name="MyGroupsScreen"
        component={MyGroupsScreen}
        options={{ headerShown: false }}
      />
    </MainStack.Navigator>
  );
}

const EnrolledGroups = ({ navigation }) => {
  const [myGroups, setMyGroupData] = useState([]);
  useEffect(() => {
    let mounted = true;
    fetchCreatedGroups().then((group) => {
      if (mounted) {
        setMyGroupData(group);
      }
    });
    return () => (mounted = false);
  }, []);
  return (
    <View>
      {myGroups.map(({ groupName, groupDesc, groupImage, id }) => {
        return groupCards({
          cardTitle: groupName,
          cardDesc: groupDesc,
          cardImageLink: groupImage,
          id: id,
        });
      })}
    </View>
    // <RootStack.Navigator mode="modal">
    //   <RootStack.Screen
    //     name="Main"
    //     component={MainStackScreen}
    //     options={{ headerShown: false }}
    //   />
    //   <RootStack.Screen name="MyModal" component={ModalScreen} />
    // </RootStack.Navigator>
  );
};

export default EnrolledGroups;
