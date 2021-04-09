import React from "react";
import { View, Text, Button } from "react-native";

const UsersInGroup = ({ navigation }) => {
  return (
    <View>
      <Text>This is users in group</Text>
      <Button title='Go back' onPress={() => navigation.goBack()}/>
    </View>
  );
};

export default UsersInGroup;
