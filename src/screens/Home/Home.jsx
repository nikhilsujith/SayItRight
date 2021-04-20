import React,{useEffect} from "react";
import {Alert} from "react-native";
import { View, Text, Container, Fab, Button, Icon } from "native-base";
import { FloatingActionButton } from "../../components";
import { createStackNavigator } from "@react-navigation/stack";
import { AuthenticationScreen,HomeStackScreen } from "../../routes";

import Amplify, { Auth } from 'aws-amplify';
import awsconfig from '../../aws-exports';
Amplify.configure(awsconfig);
import { withAuthenticator,Authenticator, SignIn, SignUp, ConfirmSignUp, Greetings } from 'aws-amplify-react-native';


import { logout } from "../../util/CustomAmplifyAuth";
import { currentSession } from "../../util/AmplifyCurrentSession";

import {setJSExceptionHandler, getJSExceptionHandler} from 'react-native-exception-handler';



const RootStack = createStackNavigator();
const MainStack = createStackNavigator();

      function MainStackScreen() {
        return (
          <MainStack.Navigator >
            <MainStack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
          </MainStack.Navigator>
        );
      }
      function ModalScreen({ navigation }) {
        return (
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ fontSize: 30 }}>This is a modal!</Text>
            <Button onPress={() => navigation.goBack()} title="Dismiss" />
          </View>
        );
      }
      function HomeScreen({ navigation }) {
        return (
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ fontSize: 30 }}>Say It Right</Text>
            <Button onPress= {() => logout()} style= {{justifyContent: 'center', alignItems: 'center'}}><Text>Logout</Text></Button>
      {/*       <Button color="white" title="Logout" onPress={() => logout()}/> */}
            {/* <Button
              onPress={() => navigation.navigate('MyModal')}
            ><Text>Trigger</Text></Button> */}
          </View>
        );
      }

      const Home = () => {
          //if(Auth.user){
                    try{
                    console.log(currentSession())
                    //console.log(Auth.user)
                              return (
                                  <RootStack.Navigator mode="modal">
                                  <RootStack.Screen
                                    name="Main"
                                    component={MainStackScreen}
                                    options={{ headerShown: false }}
                                  />
                                  <RootStack.Screen name="MyModal" component={ModalScreen} />
                                </RootStack.Navigator>
                                );
                              }
                              catch(e){
                                return(  <AuthenticationScreen/>     );
                              }
//           }
//           else{
//           return(<RootStack.Navigator mode="modal">
//                                                    <RootStack.Screen
//                                                      name="Main"
//                                                      component={MainStackScreen}
//                                                      options={{ headerShown: false }}
//                                                    />
//                                                    <RootStack.Screen name="MyModal" component={ModalScreen} />
//                                                  </RootStack.Navigator>);
//           }


      };

//export default (Auth.user)?Home:Home;
export default (Auth.user)?Home:withAuthenticator(Home);
const errorHandler = (error, isFatal) => {

if (isFatal) {
//       Alert.alert(
//           'Unexpected error occurred',
//           `
//           Error: ${(isFatal) ? 'Fatal:' : ''} ${error.name} ${error.message}
//           `,
//         [{
//           text: 'OK'
//         }]
//       );

        <Authenticator>
        </Authenticator>

}


};


setJSExceptionHandler(errorHandler,true);
// const exceptionhandler = (exceptionString) => {
//   Alert.alert(error.message);
// };
// setNativeExceptionHandler(
//   exceptionhandler,
//   true
// );




