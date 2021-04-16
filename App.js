import React, { useState, useEffect } from "react";
import { StyleSheet,StatusBar, View, Text, ActivityIndicator } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { MainStackScreen,NewProfileStackScreen,SettingsStackScreen } from "./src/routes";
import theme from './src/constants/theme';
import { LoadingIndicator } from "./src/components";
import Amplify, { Auth } from 'aws-amplify';
import awsconfig from './src/aws-exports';
Amplify.configure(awsconfig);
import { withAuthenticator } from 'aws-amplify-react-native';
import { currentSession } from "./src/util/AmplifyCurrentSession";

const AppContainer = () => {
  const [loggedIn, setLoggedIn] = useState(true);
  return (

    <NavigationContainer>
          <StatusBar barStyle="light-content" />
          {loggedIn == true ? ( <MainStackScreen />) : ( <View> <Text>Login</Text> </View>)}
        </NavigationContainer>

  );
};

const App = () => {

//console.log(currentSession())
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

    return   <AppContainer />;
  } else {
    return <LoadingIndicator />;
  }
};

export default (Auth.user)?App:withAuthenticator(App);

//export default App;



