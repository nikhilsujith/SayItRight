import Amplify, { Auth } from "aws-amplify";
import { sub } from "react-native-reanimated";

export const currentSession = () => {
  let pId = Auth.user.attributes.sub;
  return pId;
};
