import React from "react";
import { View, Fab, Icon } from "native-base";
import { theme } from "../../constants/theme";
import { TouchableOpacity } from "react-native-gesture-handler";

const FloatingActionButton = ({ onPress, icon }) => {
  return (
    <View style={{ flex: 1 }}>
      <Fab
        style={{ backgroundColor: theme.secondary.backgroundColor }}
        position="bottomRight"
        onPress={onPress}
      >
        {icon}
      </Fab>
    </View>
  );
};

export default FloatingActionButton;
