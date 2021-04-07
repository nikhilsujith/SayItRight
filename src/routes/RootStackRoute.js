import React from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import { Home } from '../screens';

const RootStack = createStackNavigator();

const RootStackRoute = ({ navigation }) => {
    <RootStack.Navigator>
        <RootStack.Screen name="Home" component={Home} />
    </RootStack.Navigator>
}

export default RootStackRoute;