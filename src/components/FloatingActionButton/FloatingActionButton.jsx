import React from "react";
import { View, Fab, Icon } from 'native-base';
import {theme} from '../../constants/theme';

const FloatingActionButton = ({onPress}) => {
  return (
    <View style={{ flex: 1 }}>
      <Fab style={{ backgroundColor: theme.secondary.backgroundColor }} position="bottomRight">
        <Icon name="add" onPress={onPress} />
      </Fab>
    </View>
  );
};

export default FloatingActionButton;
