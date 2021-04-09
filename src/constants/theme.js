import { StyleSheet } from 'react-native';
import custom from './custom';

export const theme = StyleSheet.create({
    primary:{
        // backgroundColor: custom.primary.backgroundColor,
        backgroundColor: custom.darkBlue,
        color: custom.white
        // color: custom.primary.color
    },
    secondary:{
        // backgroundColor: custom.secondary.backgroundColor,
        backgroundColor: custom.yellow,
        color: custom.purple
        // color: custom.secondary.color        
    },

});
