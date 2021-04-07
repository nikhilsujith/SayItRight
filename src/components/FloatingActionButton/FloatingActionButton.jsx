import React from "react";
import { View, Fab, Text, Icon } from 'native-base';

const FloatingActionButton = () => {
  return (
    <View style={{ flex: 1 }}>
      <Fab style={{ backgroundColor: "#5067FF" }} position="bottomRight">
        <Icon name="add" onPress={() => alert("Create Group")} />
      </Fab>
    </View>
  );
};

export default FloatingActionButton;
