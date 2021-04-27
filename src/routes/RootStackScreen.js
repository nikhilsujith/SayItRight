import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import {
  Home,
  MyGroups,
  UserDetails,
  VideoScreen,
  AudioScreen,
  NewProfile,
  Recording,
  UsersInGroup,
} from "../screens";

import { theme } from "../constants/theme";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

const HomeStack = createStackNavigator();
const MyGroupsStack = createStackNavigator();
const SettingsStack = createStackNavigator();
//const NewProfileStack = createStackNavigator();
const AuthenticationStack = createStackNavigator();

const Tabs = createBottomTabNavigator();

export const NewProfileStackScreen = () => (
  <SettingsStack.Navigator>
    <SettingsStack.Screen
      name="SettingsNewProfileStack"
      component={NewProfile}
      options={{
        title: "New Profile",
        headerStyle: {
          backgroundColor: theme.primary.backgroundColor,
          elevation: 0,
          shadowOpacity: 0,
          borderBottomWidth: 0,
        },
        headerTintColor: theme.primary.color,
      }}
    />
    <SettingsStack.Screen
      name="SettingsVideoStack"
      component={VideoScreen}
      options={{
        title: "New Profile",
        headerStyle: {
          backgroundColor: theme.primary.backgroundColor,
          elevation: 0,
          shadowOpacity: 0,
          borderBottomWidth: 0,
        },
        headerTintColor: theme.primary.color,
      }}
    />
    <SettingsStack.Screen
      name="SettingsAudioStack"
      component={AudioScreen}
      options={{
        title: "New Profile",
        headerStyle: {
          backgroundColor: theme.primary.backgroundColor,
          elevation: 0,
          shadowOpacity: 0,
          borderBottomWidth: 0,
        },
        headerTintColor: theme.primary.color,
      }}
    />
    <SettingsStack.Screen
      name="SettingsRecordingStack"
      component={Recording}
      options={{
        title: "New Profile",
        headerStyle: {
          backgroundColor: theme.primary.backgroundColor,
          elevation: 0,
          shadowOpacity: 0,
          borderBottomWidth: 0,
        },
        headerTintColor: theme.primary.color,
      }}
    />
  </SettingsStack.Navigator>
);

export const SettingsStackScreen = () => (
  <SettingsStack.Navigator>
    <SettingsStack.Screen
      name="SettingsStack"
      component={UserDetails}
      options={{
        title: "Settings",
        headerStyle: {
          backgroundColor: theme.primary.backgroundColor,
          elevation: 0,
          shadowOpacity: 0,
          borderBottomWidth: 0,
        },
        headerTintColor: theme.primary.color,
      }}
    />
    <SettingsStack.Screen
      name="SettingsVideoStack"
      component={VideoScreen}
      options={{
        title: "Upload Video",
        headerStyle: {
          backgroundColor: theme.primary.backgroundColor,
          elevation: 0,
          shadowOpacity: 0,
          borderBottomWidth: 0,
        },
        headerTintColor: theme.primary.color,
      }}
    />
    <SettingsStack.Screen
      name="SettingsAudioStack"
      component={AudioScreen}
      options={{
        title: "Upload Audio",
        headerStyle: {
          backgroundColor: theme.primary.backgroundColor,
          elevation: 0,
          shadowOpacity: 0,
          borderBottomWidth: 0,
        },
        headerTintColor: theme.primary.color,
      }}
    />
    <SettingsStack.Screen
      name="SettingsRecordingStack"
      component={Recording}
      options={{
        title: "Settings",
        headerStyle: {
          backgroundColor: theme.primary.backgroundColor,
          elevation: 0,
          shadowOpacity: 0,
          borderBottomWidth: 0,
        },
        headerTintColor: theme.primary.color,
      }}
    />
  </SettingsStack.Navigator>
);

export const MyGroupsStackScreen = () => (
  <MyGroupsStack.Navigator>
    <MyGroupsStack.Screen
      name="MyGroupsStackScreen"
      component={MyGroups}
      options={{
        title: "Groups",
        headerStyle: {
          backgroundColor: theme.primary.backgroundColor,
          elevation: 0,
          shadowOpacity: 0,
          borderBottomWidth: 0,
        },
        headerTintColor: theme.primary.color,
      }}
    />
    <MyGroupsStack.Screen
      name="UsersInGroup"
      component={UsersInGroup}
      options={({ route }) => ({
        title: route.params.groupName,
        headerTitleStyle: {color: theme.secondary.backgroundColor},
        headerStyle: {
          backgroundColor: theme.primary.backgroundColor,
          elevation: 0,
          shadowOpacity: 0,
          borderBottomWidth: 0,
        },
        headerTintColor: theme.primary.color,
      })}
    />
  </MyGroupsStack.Navigator>
);

export const HomeStackScreen = ({ navigation }) => (
  <HomeStack.Navigator>
    <HomeStack.Screen
      name="HomeStackScreen"
      component={Home}
      options={{
        title: "Home",
        headerStyle: {
          backgroundColor: theme.primary.backgroundColor,
          elevation: 0,
          shadowOpacity: 0,
          borderBottomWidth: 0,
        },
        headerTintColor: theme.primary.color,
      }}
    />
  </HomeStack.Navigator>
);

//export const NewProfileStackScreen = () => (
//  <NewProfileStack.Navigator>
//    <NewProfileStack.Screen
//      name="NewProfileStack"
//      component={NewProfile}
//      options={{
//        title: "NewProfile",
//        headerStyle: {
//          backgroundColor: theme.primary.backgroundColor,
//          elevation: 0,
//          shadowOpacity: 0,
//          borderBottomWidth: 0,
//        },
//        headerTintColor: theme.primary.color,
//      }}
//    />
//  </NewProfileStack.Navigator>
//);

// const MyGroupsStack = createStackNavigator();
// const MyGroupsStackScreen = () => {
//   return (
//     <MyGroupsStack.Navigator>
//       <MyGroupsStack.Screen
//         name="MyGroupsScreen"
//         component={MyGroupsScreen}
//         options={{ headerShown: false }}
//       />
//     </MyGroupsStack.Navigator>
//   );
// }

export const MainStackScreen = () => (
  <Tabs.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;
        if (route.name === "Home") {
          iconName = focused ? "home" : "home-outline";
        } else if (route.name === "Settings") {
          iconName = focused ? "list-circle" : "list";
        } else if (route.name === "EnrolledGroups") {
          iconName = focused ? "people-circle" : "people-circle-outline";
        } else if (route.name === "MyGroups") {
          iconName = focused ? "people-circle" : "people-circle-outline";
        }
        return <Ionicons name={iconName} size={size} color={color} />;
      },
    })}
    tabBarOptions={{
      activeTintColor: theme.primary.backgroundColor,
      inactiveTintColor: "black",
      //      style: {
      //            bottom:(Auth.user)?0:-200 //hides bottom navigation if Authentication page is viewed
      //         },
      showLabel: false,
    }}
  >
    {/* <Tabs.Screen name="Home" component={HomeStackScreen} /> */}

    <Tabs.Screen
      name="MyGroups"
      component={MyGroupsStackScreen}
      options={{ title: "Groups" }}
    />
    <Tabs.Screen
      name="Settings"
      component={SettingsStackScreen}
      options={{ title: "Settings" }}
    />
  </Tabs.Navigator>
);

export const AuthenticationScreen = () => <Authenticator></Authenticator>;

//    <Tabs.Screen
//          name="Authentication"
//          component={AuthenticationScreen}
//        />
