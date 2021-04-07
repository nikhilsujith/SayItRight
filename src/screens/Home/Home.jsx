import React from "react";
import { View, Text, Container, Fab, Button, Icon } from "native-base";
import { FloatingActionButton } from "../../components";
import { createStackNavigator } from "@react-navigation/stack";

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
      <Text style={{ fontSize: 30 }}>This is the home screen!</Text>
      <Button
        onPress={() => navigation.navigate('MyModal')}
      ><Text>Trigger</Text></Button>
    </View>
  );
}

const Home = () => {
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
};

export default Home;
