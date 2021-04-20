import React from "react";
import {
  View,
  Input,
  Item,
  Textarea,
} from "native-base";
import { Button, Text } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

const CreateNewGroup = () => {
  return (
    <View>
      <View>
        <Text>Image Picker Goes Here</Text>
      </View>
      <Item>
        <Input placeholder="Group Name" />
        {/* <Icon name="checkmark-circle" /> */}
      </Item>
      <Textarea rowSpan={5} bordered placeholder="Group Description" />
      <Item style={{flex: 1, alignSelf: 'center'}}>
        <Button title="Create Group"/>
      </Item>
    </View>
  );
};

export default CreateNewGroup;
