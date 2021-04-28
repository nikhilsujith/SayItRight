import { StyleSheet } from 'react-native';
import custom from './custom';




export const theme = StyleSheet.create({
    primary:{
        backgroundColor: custom.black,
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


const COLORS = {
    WHITE: '#FFFFFF',
    BLACK: '#000000',
    GREY: '#898989',
    THEME: '#B23AFC',
    PRIMARY: '#B23AFC',
    INFO: '#1232FF',
    ERROR: '#FE2472',
    WARNING: '#FF9C09',
    SUCCESS: '#45DF31',
    TRANSPARENT: 'transparent',
    INPUT: '#808080',
    PLACEHOLDER: '#9FA5AA',
    NAVBAR: '#F9F9F9',
    BLOCK: '#808080',
    MUTED: '#9FA5AA',
    NEUTRAL: 'rgba(255,255,255, 0.65)',
    FACEBOOK: '#3B5998',
    TWITTER: '#5BC0DE',
    DRIBBBLE: '#EA4C89',
    ICON: '#000000',
  };
  
  const SIZES = {
    BASE: 16,
    FONT: 16,
    OPACITY: 0.8,
  };
  
  export default {
    COLORS,
    SIZES,
  };
  