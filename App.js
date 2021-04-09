import React, { useState, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import { StatusBar, View, Text, ActivityIndicator } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Home, MyGroups, EnrolledGroups, Settings } from "./src/screens";
import { theme } from "./src/constants/theme";

const Tabs = createBottomTabNavigator();
const HomeStack = createStackNavigator();
const MyGroupsStack = createStackNavigator();
const EnrolledGroupsStack = createStackNavigator();
const SettingsStack = createStackNavigator();

const HomeStackScreen = () => (
  <HomeStack.Navigator>
    <HomeStack.Screen
      name="Home"
      component={Home}
      options={{
        title: "Home",
        headerStyle: {
          backgroundColor: theme.primary.backgroundColor,
        },
        headerTintColor: theme.primary.color,
      }}
    />
  </HomeStack.Navigator>
);

const MyGroupsStackScreen = () => (
  <MyGroupsStack.Navigator>
    <MyGroupsStack.Screen
      name="MyGroups"
      component={MyGroups}
      options={{
        title: "My Groups",
        headerStyle: {
          backgroundColor: theme.primary.backgroundColor,
        },
        headerTintColor: theme.primary.color,
      }}
    />
  </MyGroupsStack.Navigator>
);

// const EnrolledGroupsStackScreen = () => (
//   <EnrolledGroupsStack.Navigator>
//     <EnrolledGroupsStack.Screen
//       name="EnrolledGroups"
//       component={EnrolledGroups}
//       options={{title: 'Enrolled Groups'}}
//     />
//   </EnrolledGroupsStack.Navigator>
// );

const SettingsStackScreen = () => (
  <SettingsStack.Navigator>
    <SettingsStack.Screen
      name="SettingsStack"
      component={Settings}
      options={{
        title: "Settings",
        headerStyle: {
          backgroundColor: theme.primary.backgroundColor,
        },
        headerTintColor: theme.primary.color,
      }}
    />
  </SettingsStack.Navigator>
);

const TabsScreen = () => (
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
          iconName = focused ? "person" : "person-outline";
        }

        // You can return any component that you like here!
        return <Ionicons name={iconName} size={size} color={color} />;
      },
    })}
    tabBarOptions={{
      activeTintColor: "black",
      inactiveTintColor: "black",
    }}
  >
    <Tabs.Screen name="Home" component={HomeStackScreen} />
    <Tabs.Screen
      name="MyGroups"
      component={MyGroupsStackScreen}
      options={{ title: "My Groups" }}
    />
    {/* <Tabs.Screen
      name="EnrolledGroups"
      component={EnrolledGroupsStackScreen}
      options={{ title: "Enrolled" }}
    /> */}
    <Tabs.Screen
      name="Settings"
      component={SettingsStackScreen}
      options={{ title: "Settings" }}
    />
  </Tabs.Navigator>
);

const AppContainer = () => {
  return (
    <NavigationContainer>
      <StatusBar barStyle="light-content" />
      <TabsScreen />
    </NavigationContainer>
  );
};

const AppLoading = () => {
  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <ActivityIndicator size="large" />
        <Text>Loading</Text>
      </View>
    </View>
  );
};

const App = () => {
  const [isReady, setIsReady] = useState(false);
  useEffect(() => {
    // Font.loadAsync({
    //   Roboto: require("native-base/Fonts/Roboto.ttf"),
    //   Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
    //   ...Ionicons.font,
    // });
    setIsReady({ isReady: true });
  }, []);

  if (isReady) {
    return <AppContainer />;
  } else {
    return <AppLoading />;
  }
};

export default App;
