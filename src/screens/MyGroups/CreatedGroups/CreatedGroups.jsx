import React, { useState, useEffect, useCallback } from "react";
import {
  TouchableOpacity,
  View,
  Text,
  FlatList,
} from "react-native";
import { GroupCard } from "../../../components";
import { deleteGroup } from "../../../service/Group/GroupService";


const handleDeleteGroup = (id) => {
  deleteGroup(id);
};

const CreatedGroupsCard = ({
  navigation,
  cardTitle,
  cardDesc,
  cardImageLink,
  id,
}) => {
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("UsersInGroup", {
          id: id,
          groupName: cardTitle,
          groupDesc: cardDesc,
          groupImage: cardImageLink,
        });
      }}
      onLongPress={() => handleDeleteGroup(id)}
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
  const renderItem = ({ item : { groupName, groupDesc, groupImage, creatorName, currentUser, id } }) => (
    <CreatedGroupsCard
      id={id}
      cardTitle={groupName}
      cardDesc={groupDesc}
      cardImageLink={groupImage}
      creatorName={creatorName}
      currentUser={currentUser}
      navigation={navigation}
    />
  );

  return (
    <View>
      <FlatList data={createdGroups} renderItem={renderItem} />
      {/* {enrolledGroups &&
        enrolledGroups.map(({ groupName, groupDesc, groupImage, id }) => {
          return groupCards({
            cardTitle: groupName,
            cardDesc: groupDesc,
            cardImageLink: groupImage,
            id: id,
            navigation: navigation,
          });
        })} */}
    </View>
  );
};

export default CreatedGroups;
