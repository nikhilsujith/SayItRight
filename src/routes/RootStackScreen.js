import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Home, MyGroups, Settings } from "../screens";
import { theme } from "../constants/theme";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

const HomeStack = createStackNavigator();
const MyGroupsStack = createStackNavigator();
const SettingsStack = createStackNavigator();
const Tabs = createBottomTabNavigator();

export const SettingsStackScreen = () => (
  <SettingsStack.Navigator>
    <SettingsStack.Screen
      name="SettingsStack"
      component={Settings}
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
        // You can return any component that you like here!
        return <Ionicons name={iconName} size={size} color={color} />;
      },
    })}
    tabBarOptions={{
      activeTintColor: theme.primary.backgroundColor,
      inactiveTintColor: "black",
      showLabel: false
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
      options={{ title: "Settings"}}

    />
  </Tabs.Navigator>
);
