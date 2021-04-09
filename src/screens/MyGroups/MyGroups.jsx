import React, { Component } from "react";
import {
  Container,
  Header,
  Tab,
  Tabs,
  ScrollableTab,
  View,
  Text,
  Fab,
  Icon,
  Button,
} from "native-base";
import { ScrollView } from "react-native-gesture-handler";
import EnrolledGroups from "./EnrolledGroups/EnrolledGroups";
import CreatedGroups from "./CreatedGroups/CreatedGroups";
import CreateNewGroup from "./CreateNewGroup/CreateNewGroup";
import { createStackNavigator } from "@react-navigation/stack";
import { theme } from '../../constants/theme';

const RootStack = createStackNavigator();
const MyGroupsStack = createStackNavigator();

const MyGroupsStackScreen = () => {
  return (
    <MyGroupsStack.Navigator>
      <MyGroupsStack.Screen
        name="MyGroupsScreen"
        component={MyGroupsScreen}
        options={{ headerShown: false }}
      />
    </MyGroupsStack.Navigator>
  );
}

const MyGroupsScreen = ({navigation}) => {
  return (
    <Container>
      <ScrollView>
        <Tabs renderTabBar={() => <ScrollableTab style={{backgroundColor: theme.primary.backgroundColor}}/>}>
          <Tab heading="Enrolled" tabStyle={{backgroundColor: theme.primary.backgroundColor}} textStyle={{color: '#fff'}} activeTabStyle={{backgroundColor: theme.primary.backgroundColor}} activeTextStyle={{color: theme.secondary.backgroundColor, fontWeight: 'normal'}}>
            <EnrolledGroups />
          </Tab>
          <Tab heading="Owned" tabStyle={{backgroundColor: theme.primary.backgroundColor}} textStyle={{color: '#fff'}} activeTabStyle={{backgroundColor: theme.primary.backgroundColor}} activeTextStyle={{color: theme.secondary.backgroundColor, fontWeight: 'normal'}}>
            <CreatedGroups />
          </Tab>
        </Tabs>
      </ScrollView>
      <View style={{ flex: 1 }}>
        <Fab style={{ backgroundColor: theme.secondary.backgroundColor}} position="bottomRight">
          <Icon style={{color: theme.secondary.color}} name="add" onPress={() => navigation.navigate("CreateNewGroup")} />
        </Fab>
      </View>
    </Container>
  );
};


const MyGroups = () => {
  return (
    // <Container>
    //   <ScrollView>
    //     <Tabs renderTabBar={() => <ScrollableTab />}>
    //       <Tab heading="Enrolled">
    //         <EnrolledGroups />
    //       </Tab>
    //       <Tab heading="Owned">
    //         <CreatedGroups />
    //       </Tab>
    //     </Tabs>
    //   </ScrollView>
    //   <View style={{ flex: 1 }}>
    //     <Fab style={{ backgroundColor: "#5067FF" }} position="bottomRight">
    //       <Icon name="add" onPress={() => navigation.navigate("MyModal")} />
    //     </Fab>
    //   </View>
    // </Container>
    <RootStack.Navigator mode="modal">
      <RootStack.Screen
        name="MyGroupsStack"
        component={MyGroupsStackScreen}
        options={{ headerShown: false }}
      />
      <RootStack.Screen name="CreateNewGroup" component={CreateNewGroup} />
    </RootStack.Navigator>
  );
};
export default MyGroups;