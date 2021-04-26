import React, { useState, useEffect } from "react";
import { TouchableOpacity, View, Text, Button, Alert, FlatList, SafeAreaView } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { GroupCard } from "../../../components";
import { enrollGroup } from "../../../service/User/UserService";


const joinAlert = (creatorName, id, currentUser) =>
  Alert.alert("Group Info", `Owner: ${creatorName}`,[
    {
      text: "Cancel",
      onPress: () => console.log("Cancel Pressed"),
      style: "cancel",
    },
    { text: "Join", onPress: () => enrollGroup(id, currentUser) },
  ]);

const AllGroupsCard = ({ navigation, cardTitle, cardDesc, cardImageLink, id, creatorName, currentUser }) => {
  return (
    <TouchableOpacity
      onLongPress={() => {
        joinAlert(creatorName, id, currentUser);
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
  const renderItem = ({ item : { groupName, groupDesc, groupImage, creatorName, currentUser, navigation } }) => (
    <AllGroupsCard
      cardTitle={groupName}
      cardDesc={groupDesc}
      cardImageLink={groupImage}
      creatorName={creatorName}
      currentUser={currentUser}
      navigation={navigation}
    />
  );

  return (
    <SafeAreaView>
      <FlatList
        data = {allGroups}
        renderItem = {renderItem}
      />
      {/* {allGroups &&
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
        })} */}
    </SafeAreaView>
  );
};

export default AllGroups;
