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
import { BannerAds } from "./src/components";

import { getUserByPoolId } from "./src/service/User/UserService";
import { currentSession } from "./src/util/AmplifyCurrentSession";

const AppContainer = (props) => {
  const [loggedIn, setLoggedIn] = useState(true);

  console.log(currentSession())
//  getUserByPoolId(currentSession())
//  .then((data) => JSON.parse(data))
//        .then(data => console.log(data));
        //var response=JSON.parse(res)
//        console.log(res[0])
//        if(res[3]!=500){
//            setNewUser(false)
//        }
//        Object {
//          "error": "Internal Server Error",
//          "message": "No value present",
//          "path": "/api/v1/user/%7Bid%7D",
//          "status": 500,
//          "timestamp": "2021-04-17T04:53:33.060+00:00",
//        }
      //{newUser ? ( <NewProfileStackScreen />) : ( <MainStackScreen />)}
  return (
    <NavigationContainer>
      <StatusBar barStyle="light-content" />
      {props.newUser ? ( <NewProfileStackScreen />) : ( <MainStackScreen />)}
    </NavigationContainer>
  );
};

const App = () => {
  const [isReady, setIsReady] = useState(false);
  const [newUser, setNewUser] = useState(true);


  useEffect(() => {
    console.log(currentSession())
//    async ()=>{
//              await getUserByPoolId(currentSession())
//              //.then((data) => JSON.parse(data))
//                    .then(data => console.log(data));}
    // Font.loadAsync({
    //   Roboto: require("native-base/Fonts/Roboto.ttf"),
    //   Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
    //   ...Ionicons.font,
    // });

    setIsReady({ isReady: true });
  }, []);

  if (isReady) {

    return <AppContainer newUser={newUser}/>;
  } else {
    return <LoadingIndicator />;
  }
};

export default (Auth.user)?App:withAuthenticator(App);

//export default App;



