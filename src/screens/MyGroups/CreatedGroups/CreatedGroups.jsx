import React, { useState, useEffect, useCallback } from "react";
import { TouchableOpacity, View, Text, RefreshControl, Alert } from "react-native";
import { GroupCard } from "../../../components";
import { deleteGroup } from "../../../service/Group/GroupService";


const deleteAlert = (id) =>
  Alert.alert("Delete Group", `Are you sure you want to delete this group?`,[
    {
      text: "Cancel",
      onPress: () => console.log("Cancel Pressed"),
      style: "cancel",
    },
    { text: "Delete", onPress: () => deleteGroup(id) },
  ]);

const groupCards = ({ navigation, cardTitle, cardDesc, cardImageLink, id }) => {
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("UsersInGroup", { id: id, groupName: cardTitle });
      }}
      onLongPress={() => {deleteAlert(id)}}
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
const CreatedGroups = ({ navigation, createdGroups }) => {
  return (
    <View>
      {createdGroups &&
        createdGroups.map(({ groupName, groupDesc, groupImage, id }) => {
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
