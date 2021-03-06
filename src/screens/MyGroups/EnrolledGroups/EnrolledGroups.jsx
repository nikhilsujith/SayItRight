import React, { useState, useEffect, useCallback } from "react";
import { TouchableOpacity, View, Text, FlatList } from "react-native";
import { GroupCard } from "../../../components";

const EnrolledGroupsCard = ({
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
          owned:false,
        });
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
const EnrolledGroups = ({ navigation, enrolledGroups }) => {
  const renderItem = ({
    item: { groupName, groupDesc, groupImage, creatorName, currentUser, id },
  }) => (
    <EnrolledGroupsCard
      id={id}
      cardTitle={groupName}
      cardDesc={groupDesc}
      cardImageLink={groupImage}
      creatorName={creatorName}
      currentUser={currentUser}
      navigation={navigation}
    />
  );

  return <FlatList data={enrolledGroups} renderItem={renderItem} />;
};
{
  /* {enrolledGroups &&
      enrolledGroups.map(({ groupName, groupDesc, groupImage, id }) => {
        return groupCards({
          cardTitle: groupName,
          cardDesc: groupDesc,
          cardImageLink: groupImage,
          id: id,
          navigation: navigation,
        });
      })} */
}

export default EnrolledGroups;
