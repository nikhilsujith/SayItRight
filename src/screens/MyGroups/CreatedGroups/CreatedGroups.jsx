import React, { useState, useEffect, useCallback } from "react";
import { TouchableOpacity, View, Text, RefreshControl } from "react-native";
import { GroupCard } from "../../../components";

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
    <View>
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
    </View>
  );
};

// export default Auth.user ? CreatedGroups : withAuthenticator(CreatedGroups);
export default CreatedGroups;
