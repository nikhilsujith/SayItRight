import React, { useState, useEffect } from "react";
import { View, Text, Button, Footer, Icon, Fab } from "native-base";
import { FloatingActionButton, GroupCard } from "../../components";
import { fetchCreatedGroups } from "../../service/User/UserService";
import { createStackNavigator } from "@react-navigation/stack";

const RootStack = createStackNavigator();
const MainStack = createStackNavigator();

const groupCards = ({ cardTitle, cardDesc, cardImageLink, id }) => {
  return (
    <GroupCard
      // key = {id}
      cardTitle={cardTitle}
      cardDesc={cardDesc}
      cardImageLink={cardImageLink}
    />
  );
};

const MyGroupsScreen = ({ navigation }) => {
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
