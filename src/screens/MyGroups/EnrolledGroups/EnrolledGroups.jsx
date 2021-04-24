import React, { useState, useEffect } from "react";
import { TouchableOpacity, View, Text, Button, RefreshControl } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { GroupCard } from "../../../components";
import { fetchEnrolledGroups } from "../../../service/User/UserService";

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
      {/* <Button title='CLICK' onPress={()=>navigation.navigate('CreateNewGroup')} /> */}
      {myGroups.map(({ groupName, groupDesc, groupImage, id }) => {
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

export default EnrolledGroups;
