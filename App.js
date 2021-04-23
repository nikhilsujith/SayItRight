import React, { useState, useEffect } from 'react';
import { StatusBar, View, Text, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { MainStackScreen, NewProfileStackScreen } from './src/routes';
import theme from './src/constants/theme';
import { LoadingIndicator } from './src/components';
import Amplify, { Auth } from 'aws-amplify';
import awsconfig from './src/aws-exports';
Amplify.configure(awsconfig);
import { withAuthenticator } from 'aws-amplify-react-native';
import { BannerAds } from './src/components';

import { getUserByPoolId } from './src/service/User/UserService';
import { currentSession } from './src/util/AmplifyCurrentSession';

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

  useEffect(() => {
    (async () => {
      const fetchedPosts = await getUserByPoolId(currentSession());
      if (fetchedPosts.status != '500') {
        setNewUser(false);
      }
    })();

    // Font.loadAsync({
    //   Roboto: require("native-base/Fonts/Roboto.ttf"),
    //   Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
    //   ...Ionicons.font,
    // });
    setIsReady({ isReady: true });
  }, []);

  if (isReady) {
    return <AppContainer newUser={newUser} />;
  } else {
    return <LoadingIndicator />;
  }
};
//

export default Auth.user ? App : withAuthenticator(App);

