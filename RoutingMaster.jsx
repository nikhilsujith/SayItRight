// In App.js in a new project

import * as React from "react";
import {
  View,
  Text,
  Header,
  Left,
  Right,
  Body,
  Title,
  Icon,
} from "native-base";
import { Button } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import {
  bottomTabNavigator,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";
import { ScreenContainer } from "react-native-screens";

/*------------------------------------------------------------Components------------------------------------------------------------ */

function MyHeader({ scene, previous, navigation }) {
  const { options } = scene.descriptor;
  const title =
    options.headerTitle !== undefined
      ? options.headerTitle
      : options.title !== undefined
      ? options.title
      : scene.route.name;

  return (
    <Header>
      <Left>
        {previous ? (
          <Button title="" transparent onPress={navigation.goBack}>
            <Icon name="arrow-back" />
          </Button>
        ) : undefined}
      </Left>
      <Body>
        <Title>{title}</Title>
      </Body>
      <Right></Right>
    </Header>
  );
}

/*------------------------------------------------------------Screens------------------------------------------------------------ */
function SignIn({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Sign In</Text>
      <Button
        title="Create Account"
        onPress={() => navigation.push("CreateAccount")}
      />
    </View>
  );
}

function CreateAccount({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Create Account</Text>
      <Button
        title="Go to Details... again"
        onPress={() => navigation.push("CreateAccount")}
      />
      <Button
        title="Go to Home"
        onPress={() => navigation.navigate("SignIn")}
      />
      <Button title="Go back" onPress={() => navigation.goBack()} />
    </View>
  );
}

function Home({ navigation }) {
  return (
    <ScreenContainer
      style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
    >
      <Text>Master List Screen</Text>
      <Button
        title="Details"
        onPress={() => navigation.push("Details", { name: "Search2" })}
      />
      <Button
        title="Details"
        onPress={() =>
          navigation.navigate("Details", { name: "React Native School" })
        }
      />
    </ScreenContainer>
  );
}

function Search({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Seacrch Screen</Text>
      <Button
        title="Search2"
        onPress={() =>
          navigation.push("Search2", { name: "React Native Example" })
        }
      />
      <Button
        title="React Native School"
        onPress={() =>
          navigation.navigate("Home", {
            screen: "Details",
            params: { name: "React Native School" },
          })
        }
      />
    </View>
  );
}

function Search2({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Search2</Text>
    </View>
  );
}

function Profile({ route }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Profile</Text>
      {route.params.name && <Text>{route.params.name}</Text>}
    </View>
  );
}

function Details({ route }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Details</Text>
      {route.params.name && <Text>{route.params.name}</Text>}
    </View>
  );
}



/*------------------------------------------------------------Main------------------------------------------------------------ */

const AuthStack = createStackNavigator();
const Tabs = createBottomTabNavigator();
const HomeStack = createStackNavigator();
const SearchStack = createStackNavigator();
const ProfileStack = createStackNavigator();
const Drawer = createDrawerNavigator();

const HomeStackScreen = () => (
  <HomeStack.Navigator>
    <HomeStack.Screen name="Home" component={Home} />
    <HomeStack.Screen
      name="Details"
      component={Details}
      options={({ route }) => ({
        title: route.params.name,
      })}
    />
  </HomeStack.Navigator>
);

const SearchStackScreen = () => (
  <SearchStack.Navigator>
    <SearchStack.Screen name="Search" component={Search} />
    <SearchStack.Screen name="Search2" component={Search2} />
  </SearchStack.Navigator>
);

const ProfileStackScreen = () => (
  <ProfileStack.Navigator>
    <ProfileStack.Screen name="Profile" component={Profile} />
  </ProfileStack.Navigator>
);

const TabsScreen = () => (
  <Tabs.Navigator>
    <Tabs.Screen name="Home" component={HomeStackScreen} />
    <Tabs.Screen name="Search" component={SearchStackScreen} />
  </Tabs.Navigator>
);


function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator>
        <Drawer.Screen name="Home" component={TabsScreen}/>
        <Drawer.Screen name="Profile" component={ProfileStackScreen}/>
      </Drawer.Navigator>
      {/* <AuthStack.Navigator>
        <AuthStack.Screen name="SignIn" component={SignIn} options={{ title: 'Sign In' }}/>
        <AuthStack.Screen name="CreateAccount" component={CreateAccount} options={{ title: 'Create Account' }}/>
      </AuthStack.Navigator> */}
    </NavigationContainer>
  );
}

export default App;
