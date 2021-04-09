import React from "react";
import { Text, Tabs, Tab, ScrollableTab } from "native-base";
import { View, StatusBar } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

const SettingsScreen = ({ navigation }) => {
  return (
    <View>
      <Tabs renderTabBar={() => <ScrollableTab />}>
        <Tab heading="Account">
          <Text>Account Settings</Text>
        </Tab>
        <Tab heading="Phone">
          <Text>Phone Settings</Text>
        </Tab>
      </Tabs>
    </View>
  );
};

const Settings = ({ navigation }) => {
  return (
    <ScrollView>
      <SettingsScreen />
    </ScrollView>
  );
};

export default Settings;
