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
  Root,
} from "native-base";
import { ScrollView } from "react-native-gesture-handler";
import EnrolledGroups from "./EnrolledGroups/EnrolledGroups";
import CreatedGroups from "./CreatedGroups/CreatedGroups";
import CreateNewGroup from "./CreateNewGroup/CreateNewGroup";
import { createStackNavigator } from "@react-navigation/stack";
import { theme } from '../../constants/theme';
import { AllGroups, UsersInGroup } from "..";
import { SafeAreaView, StatusBar } from "react-native";
import { SettingsStackScreen } from "../../routes";
import { FloatingActionButton } from "../../components";

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

export const MyGroupsScreen = ({navigation}) => {
  return (
    <Root>
      <ScrollView>
        <Tabs renderTabBar={() => <ScrollableTab style={{backgroundColor: theme.primary.backgroundColor}}/>}>
          <Tab heading="Enrolled" tabStyle={{backgroundColor: theme.primary.backgroundColor}} textStyle={{color: theme.primary.color}} activeTabStyle={{backgroundColor: theme.primary.backgroundColor}} activeTextStyle={{color: theme.secondary.backgroundColor, fontWeight: 'normal'}}>
            <EnrolledGroups navigation={navigation}/>
          </Tab>
          <Tab heading="Owned" tabStyle={{backgroundColor: theme.primary.backgroundColor}} textStyle={{color: theme.primary.color}} activeTabStyle={{backgroundColor: theme.primary.backgroundColor}} activeTextStyle={{color: theme.secondary.backgroundColor, fontWeight: 'normal'}}>
            <CreatedGroups />
          </Tab>
          <Tab heading="All" tabStyle={{backgroundColor: theme.primary.backgroundColor}} textStyle={{color: theme.primary.color}} activeTabStyle={{backgroundColor: theme.primary.backgroundColor}} activeTextStyle={{color: theme.secondary.backgroundColor, fontWeight: 'normal'}}>
            <AllGroups />
          </Tab>
        </Tabs>
      </ScrollView>
      <View style={{ flex: 1 }}>
        {/* <Fab style={{ backgroundColor: theme.secondary.backgroundColor}} position="bottomRight">
          <Icon style={{color: theme.secondary.color}} name="add" onPress={() => navigation.navigate("CreateNewGroup")} />
        </Fab> */}
        <FloatingActionButton onPress={()=>navigation.navigate('CreateNewGroup')}/>
      </View>
    </Root>
  );
};


const MyGroups = () => {
  return (
    <RootStack.Navigator mode="modal">
      <RootStack.Screen
        name="MyGroupsStack"
        component={MyGroupsStackScreen}
        options={{ headerShown: false }}
      />
      <RootStack.Screen name="CreateNewGroup" component={CreateNewGroup} />
      <RootStack.Screen name="UsersInGroup" component={UsersInGroup} options={{
        headerTitle: "Users In Group",
        headerShown: false
      }}/>
    </RootStack.Navigator>
  );
};
export default MyGroups;