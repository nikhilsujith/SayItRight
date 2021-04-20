import React, { useState, useEffect } from "react";
import { StatusBar, View, Text, ActivityIndicator } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { MainStackScreen,NewProfileStackScreen } from "./src/routes";
import theme from './src/constants/theme';
import { LoadingIndicator } from "./src/components";
import Amplify, { Auth } from 'aws-amplify';
import awsconfig from './src/aws-exports';
Amplify.configure(awsconfig);
import { withAuthenticator } from 'aws-amplify-react-native';

import { getUserByPoolId } from "./src/service/User/UserService";
import { currentSession } from "./src/util/AmplifyCurrentSession";

const AppContainer = (props) => {
  const [loggedIn, setLoggedIn] = useState(true);
  return (
    <NavigationContainer>
      <StatusBar barStyle="light-content" />
      {props.newUser ? ( <NewProfileStackScreen />) : ( <MainStackScreen />)}
    </NavigationContainer>
  );
};

const App =  () => {
  const [isReady, setIsReady] = useState(false);
  const [newUser, setNewUser] = useState(true);

  useEffect(() => {
 (async () => {
      const user = await getUserByPoolId(currentSession());
      if(user.status!='500'){
        setNewUser(false);
      }
    })();
    setIsReady({ isReady: true });
  }, []);

  if (isReady) {
    return <AppContainer newUser={newUser}/>;
  } else {
    return <LoadingIndicator />;
  }
};

export default (Auth.user)?App:withAuthenticator(App);