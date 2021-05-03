import Amplify, { Auth } from "aws-amplify";
import { sub } from "react-native-reanimated";

export const currentSession = async () => {
  let pId = await Auth.user.attributes.sub;
  return pId;
};

export const currentSessionEmail = async () => {
  let email = await Auth.user.attributes.email;
  return email;
};
