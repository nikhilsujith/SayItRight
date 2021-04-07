import React from "react";
import {
  View,
  Text,
  Button,
  Input,
  Item,
  Icon,
  Form,
  Textarea,
} from "native-base";
import { Image } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

const CreateNewGroup = () => {
  return (
    <ScrollView>
      <View>
        <Image
          source={require("../../../assets/icon.png")}
          resizeMode="contain"
          style={{height: 200, width: 200, alignSelf: 'center', marginTop: 10, marginBottom: 10}}
        ></Image>
      </View>
      <Item>
        <Input placeholder="Group Name" />
        {/* <Icon name="checkmark-circle" /> */}
      </Item>
      <Textarea rowSpan={5} bordered placeholder="Group Description" />
      <Item style={{borderStyle: 'solid', borderWidth: 10, backgroundColor: 'red', alignSelf: 'center'}}>
        <Button>
          <Text>Create</Text>
        </Button>
      </Item>
    </ScrollView>
  );
};

export default CreateNewGroup;
