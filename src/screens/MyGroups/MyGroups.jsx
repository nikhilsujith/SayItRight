import React, { useState, useEffect, useCallback } from "react";
import {
  Container,
  Header,
  Tab,
  Tabs,
  ScrollableTab,
  View,
  Text,
  Fab,
  Icon,
  Button,
  Root,
} from "native-base";
import { RefreshControl } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import EnrolledGroups from "./EnrolledGroups/EnrolledGroups";
import CreatedGroups from "./CreatedGroups/CreatedGroups";
import CreateNewGroup from "./CreateNewGroup/CreateNewGroup";
import { createStackNavigator } from "@react-navigation/stack";
import { theme } from "../../constants/theme";
import { AllGroups, UsersInGroup } from "..";
import { Dimensions, SafeAreaView, StatusBar } from "react-native";
import { FloatingActionButton, BannerAds } from "../../components";

import Amplify, { Auth } from "aws-amplify";
import awsconfig from "../../aws-exports";
Amplify.configure(awsconfig);
import { withAuthenticator } from "aws-amplify-react-native";

import {
  fetchEnrolledGroups,
  fetchCreatedGroups,
} from "../../service/User/UserService";
import { fetchAllGroups } from "../../service/Group/GroupService";
import { currentSession } from "../../util/AmplifyCurrentSession";

const RootStack = createStackNavigator();
const MyGroupsStack = createStackNavigator();

const MyGroupsStackScreen = () => {
  return (
    <MyGroupsStack.Navigator>
      <MyGroupsStack.Screen
        name="MyGroupsScreen"
        component={MyGroupsScreen}
        options={{ headerShown: false }}
      />
    </MyGroupsStack.Navigator>
  );
};

export const MyGroupsScreen = ({ navigation }) => {
  const [enrolledGroups, setEnrolledGroups] = useState([]);
  const [createdGroups, setCreatedGroups] = useState([]);
  const [allGroups, setAllGroupData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const currentUser = currentSession();

  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  useEffect(() => {
    let mounted = true;
    fetchEnrolledGroups(currentUser).then((group) => {
      if (mounted) {
        setEnrolledGroups(group);
      }
    });
    fetchCreatedGroups(currentUser).then((group) => {
      if (mounted) {
        setCreatedGroups(group);
      }
    });
    fetchAllGroups().then((group) => {
      if (mounted) {
        setAllGroupData(group);
      }
    });
    return () => (mounted = false);
  }, [refreshing]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <ScrollView
        contentContainerStyle={{ flex: 1 }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <Tabs
          renderTabBar={() => (
            <ScrollableTab
              style={{ backgroundColor: theme.primary.backgroundColor }}
            />
          )}
        >
          <Tab
            heading="Enrolled"
            tabStyle={{ backgroundColor: theme.primary.backgroundColor }}
            textStyle={{ color: theme.primary.color }}
            activeTabStyle={{ backgroundColor: theme.primary.backgroundColor }}
            activeTextStyle={{
              color: theme.secondary.backgroundColor,
              fontWeight: "normal",
            }}
          >
            <EnrolledGroups
              navigation={navigation}
              enrolledGroups={enrolledGroups}
            />
          </Tab>
          <Tab
            heading="Owned"
            tabStyle={{ backgroundColor: theme.primary.backgroundColor }}
            textStyle={{ color: theme.primary.color }}
            activeTabStyle={{ backgroundColor: theme.primary.backgroundColor }}
            activeTextStyle={{
              color: theme.secondary.backgroundColor,
              fontWeight: "normal",
            }}
          >
            <CreatedGroups
              navigation={navigation}
              createdGroups={createdGroups}
            />
          </Tab>
          <Tab
            heading="All"
            tabStyle={{ backgroundColor: theme.primary.backgroundColor }}
            textStyle={{ color: theme.primary.color }}
            activeTabStyle={{ backgroundColor: theme.primary.backgroundColor }}
            activeTextStyle={{
              color: theme.secondary.backgroundColor,
              fontWeight: "normal",
            }}
          >
            <AllGroups allGroups={allGroups} />
          </Tab>
        </Tabs>
      </ScrollView>
      <View>
        <View style={{ flex: 1 }}>
          <FloatingActionButton
            onPress={() => navigation.navigate("CreateNewGroup")}
            icon={<Icon name="add" />}
          />
        </View>
        {/* <BannerAds /> */}
      </View>
    </SafeAreaView>
  );
};

const MyGroups = () => {
  return (
    <RootStack.Navigator mode="modal">
      <RootStack.Screen
        name="MyGroupsStack"
        component={MyGroupsStackScreen}
        options={{ headerShown: false }}
      />
      <RootStack.Screen name="CreateNewGroup" component={CreateNewGroup} />
      <RootStack.Screen
        name="UsersInGroup"
        component={UsersInGroup}
        options={{
          headerTitle: "Users In Group",
          headerShown: false,
        }}
      />
    </RootStack.Navigator>
  );
};
// export default Auth.user ? MyGroups : withAuthenticator(MyGroups);
export default MyGroups;
