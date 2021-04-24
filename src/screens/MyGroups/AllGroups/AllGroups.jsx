import React, { useState, useEffect } from "react";
import { TouchableOpacity, View, Text, Button, Alert } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { GroupCard } from "../../../components";
import { enrollGroup } from "../../../service/User/UserService";


const createTwoButtonAlert = (creatorName, id, currentUser) =>
  Alert.alert("Group Info", `Owner: ${creatorName}`,[
    {
      text: "Cancel",
      onPress: () => console.log("Cancel Pressed"),
      style: "cancel",
    },
    { text: "Join", onPress: () => enrollGroup(id, currentUser) },
  ]);

const groupCards = ({ navigation, cardTitle, cardDesc, cardImageLink, id, creatorName, currentUser }) => {
  return (
    <TouchableOpacity
      onLongPress={() => {
        createTwoButtonAlert(creatorName, id, currentUser);
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

const AllGroups = ({ navigation, allGroups, currentUser }) => {
  // console.log(allGroups);

  return (
    <ScrollView>
      {allGroups &&
        allGroups.map(({ groupName, groupDesc, groupImage, id, creatorName }) => {
          return groupCards({
            cardTitle: groupName,
            cardDesc: groupDesc,
            cardImageLink: groupImage,
            id: id,
            navigation: navigation,
            creatorName: creatorName,
            currentUser: currentUser
          });
        })}
    </ScrollView>
  );
};

export default AllGroups;
