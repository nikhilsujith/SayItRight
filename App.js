import React, { useState, useEffect } from "react";
import { StatusBar, View, Text, ActivityIndicator } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { MainStackScreen, NewProfileStackScreen } from "./src/routes";
import { LoadingIndicator, LoadingImage } from "./src/components";
import Amplify, { Auth } from "aws-amplify";
import awsconfig from "./src/aws-exports";
Amplify.configure(awsconfig);
import { withAuthenticator } from "aws-amplify-react-native";

import { getUserByPoolId } from "./src/service/User/UserService";
import { currentSession } from "./src/util/AmplifyCurrentSession";

const AppContainer = (props) => {
  const [loggedIn, setLoggedIn] = useState(true);

  return (
    <NavigationContainer>
      <StatusBar barStyle="light-content" />
      {props.newUser ? <NewProfileStackScreen /> : <MainStackScreen />}
    </NavigationContainer>
  );
};

const App = () => {
  const [isReady, setIsReady] = useState(false);
  const [newUser, setNewUser] = useState(true);

  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };

  useEffect(() => {
    (async () => {
      const fetchedPosts = await getUserByPoolId(currentSession());
      if (fetchedPosts.status == "200") {
        setNewUser(false);
      } else if (fetchedPosts.status == "500") {
        setNewUser(true);
      }
    })();
    {
      wait(3000).then(() => {
        setIsReady({ isReady: true });
      });
    }
    // setIsReady({isReady: true})
  }, [newUser]);

  if (isReady) {
    return <AppContainer newUser={newUser} />;
  } else {
    return <LoadingImage />;
  }
};

export default Auth.user ? App : withAuthenticator(App);
