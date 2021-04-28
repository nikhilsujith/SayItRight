import React from "react";
import { StyleSheet } from "react-native"; 
import { Card, CardItem, Icon, Right, Text } from "native-base";

const TempHeader = ({ navigation, title }) => {
  return (
    <Card style={styles.root}>
      <CardItem style={styles.root}>
        <Icon name="close" onPress={() => navigation.goBack()} />
        <Text
          style={{
            textAlign: "center",
            flex: 100,
            fontSize: 17,
            fontWeight: "500",
          }}
        >
          {title}
        </Text>
        <Right style={{ flex: 1, justifyContent: "flex-end" }}></Right>
      </CardItem>
    </Card>
  );
};
export default TempHeader;

const styles = StyleSheet.create({
    root: {
      borderRadius: 10,
      paddingLeft: 10,
    },
  });