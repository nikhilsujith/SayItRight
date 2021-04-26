import { StyleSheet } from "react-native";
import { Dimensions } from "react-native";

// export default StyleSheet.create({
//   primary: {
//     backgroundColor: 'rgba(74,21,75,1)',
//     backgroundColor: 'black',
//     color: 'white'
//   },
//   secondary:{
//     backgroundColor: "#ECB22E",
//     backgroundColor: "black",
//     color: "rgba(74,21,75,1)",
//     color: "white",

// },
// });

const { width, height } = Dimensions.get("screen");
const imageHeight = height * 0;
const imageWidth = height * 0;

const custom = {
  purple: "rgba(74,21,75,1)",
  white: "#ffffff",
  yellow: "#ECB22E",
  darkBlue: "#18314A",
  black: "#000000",
  green: "#1dbf73",
  maroon: "#540e1f",
  
  // image height
  imageHeight: imageHeight,
  imageWidth: imageWidth
};

export default custom;
