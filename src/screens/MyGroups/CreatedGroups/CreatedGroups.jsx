import React, { useState, useEffect, useCallback } from "react";
import { TouchableOpacity, View, Text, RefreshControl } from "react-native";
import { GroupCard } from "../../../components";
import Amplify, { Auth } from "aws-amplify";
import awsconfig from "../../../aws-exports";
Amplify.configure(awsconfig);
import { withAuthenticator } from "aws-amplify-react-native";
import { ScrollView } from "react-native-gesture-handler";

const groupCards = ({ navigation, cardTitle, cardDesc, cardImageLink, id }) => {
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("UsersInGroup", { id: id, groupName: cardTitle });
      }}
    >
      <GroupCard
        key={id}
        cardTitle={cardTitle}
        cardDesc={cardDesc}
        cardImageLink={cardImageLink}
      />
    </TouchableOpacity>
  );
};
const CreatedGroups = ({ navigation, enrolledGroups }) => {
  return (
    <ScrollView>
      {enrolledGroups &&
        enrolledGroups.map(({ groupName, groupDesc, groupImage, id }) => {
          return groupCards({
            cardTitle: groupName,
            cardDesc: groupDesc,
            cardImageLink: groupImage,
            id: id,
            navigation: navigation,
          });
        })}
    </ScrollView>
  );
};

export default Auth.user ? CreatedGroups : withAuthenticator(CreatedGroups);
