import React, { useState, useEffect } from "react";
import { StatusBar, View, Text, ActivityIndicator } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { MainStackScreen } from "./src/routes";
import theme from './src/constants/theme';
import { LoadingIndicator } from "./src/components";
import { BannerAds } from "./src/components";

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
    return <LoadingIndicator />;
  }
};

export default App;