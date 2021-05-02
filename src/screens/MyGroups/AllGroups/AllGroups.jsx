import React, { useState, useEffect } from "react";
import {
  TouchableOpacity,
  View,
  Text,
  Button,
  Alert,
  FlatList,
  SafeAreaView,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { GroupCard } from "../../../components";
import { enrollGroup } from "../../../service/User/UserService";

const joinAlert = (creatorName, id, currentUser, navigation) =>
  Alert.alert("Group Info", `Owner: ${creatorName}`, [
    {
      text: "Cancel",
      onPress: () => console.log("Cancel Pressed"),
      style: "cancel",
    },
    {
      text: "Join",
      onPress: async () => {
       const response = await enrollGroup(id, currentUser)
        if (response == 200) {
          alert("You have successfully enrolled into the group!")
        }
        else{
          alert("Something went wrong. Please try again later");
        }
      },
    },
  ]);

const AllGroupsCard = ({
  navigation,
  cardTitle,
  cardDesc,
  cardImageLink,
  id,
  creatorName,
  currentUser,
}) => {
  return (
    <TouchableOpacity
      onLongPress={() => {
        joinAlert(creatorName, id, currentUser, navigation);
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
  const renderItem = ({
    item: { id, groupName, groupDesc, groupImage, creatorName },
  }) => (
    <AllGroupsCard
    id={id}
    cardTitle={groupName}
    cardDesc={groupDesc}
    cardImageLink={groupImage}
    creatorName={creatorName}
    currentUser={currentUser}
    navigation={navigation}
    />
  );

  return <FlatList data={allGroups} renderItem={renderItem} />;
  {
    /* {allGroups &&
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
        })} */
  }
};

export default AllGroups;
