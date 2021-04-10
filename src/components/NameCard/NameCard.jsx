import React from "react";
import { TouchableOpacity, View, Text, SafeAreaView } from "react-native";
import { List, ListItem, Left, Body, Right, Thumbnail } from "native-base";

const NameCard = ({ press, image, name, meaning }) => {
  const defaultImage = {
    uri:
      "https://nik-dev-personal-bucket.s3.amazonaws.com/nikhilsujith-008.PNG",
  };
  let link = "";
  if (image) {
    link = { uri: image };
  } else {
    link = defaultImage;
  }
  return (
    <TouchableOpacity onPress={press}>
      <List>
        <ListItem thumbnail>
          <Left>
            <Thumbnail square source={link} />
          </Left>
          <Body>
            <Text>Name</Text>
            {/* <Text note numberOfLines={1}>
                  {''}
                </Text> */}
          </Body>
          <Right></Right>
        </ListItem>
      </List>
    </TouchableOpacity>
  );
};
export default NameCard;
