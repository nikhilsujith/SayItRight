import React, { useState, useEffect } from "react";
import { Container, Text, View } from "native-base";
import { Button } from "react-native";
import { GroupCard } from "../../components";
import { ScrollView } from "react-native-gesture-handler";
import { fetchEnrolledGroups } from "../../service/User/UserService";

const groupCards = ({ cardTitle, cardDesc, cardImageLink, id }) => {
  return (
    <GroupCard
      // key = {id}
      cardTitle={cardTitle}
      cardDesc={cardDesc}
      cardImageLink={cardImageLink}
    />
  );
};
const EnrolledGroups = ({ navigation }) => {
  const [myGroups, setMyGroupData] = useState([]);
  useEffect(() => {
    let mounted = true;
    fetchEnrolledGroups().then((group) => {
      if (mounted) {
        setMyGroupData(group);
      }
    });
    return () => (mounted = false);
  }, []);
  return (
    <View>
      {
        myGroups.map(({groupName, groupDesc, groupImage, id}) => {
          return(
            groupCards({ cardTitle: groupName, cardDesc: groupDesc, cardImageLink: groupImage, id: id })
          );
        })
      }
    </View>
  );
};

export default EnrolledGroups;
