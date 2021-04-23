import React, { useState, useEffect } from "react";
import { TouchableOpacity, View, Text, Button } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { GroupCard } from "../../../components";
import { fetchAllGroups } from "../../../service/Group/GroupService";

const groupCards = ({ navigation, cardTitle, cardDesc, cardImageLink, id }) => {
  return (
    <TouchableOpacity
      onLongPress={() => {
        alert("Enroll");
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
const AllGroups = ({ navigation, allGroups }) => {
  // console.log(allGroups);
  return (
    <ScrollView>
      {allGroups &&
        allGroups.map(({ groupName, groupDesc, groupImage, id }) => {
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

export default AllGroups;
