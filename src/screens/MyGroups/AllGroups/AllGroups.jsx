import React, { useState, useEffect } from "react";
import { TouchableOpacity, View, Text, Button } from "react-native";
import { GroupCard } from "../../../components";
import { fetchAllGroups } from "../../../service/Group/GroupService";





const groupCards = ({ navigation, cardTitle, cardDesc, cardImageLink, id }) => {
  return (
    <TouchableOpacity onLongPress={() => {alert('Enroll')}}>
      <GroupCard
        key={id}
        cardTitle={cardTitle}
        cardDesc={cardDesc}
        cardImageLink={cardImageLink}
      />
    </TouchableOpacity>
  );
};
const AllGroups = ({ navigation }) => {
  const [allGroups, setAllGroupData] = useState([]);

  // console.log(allGroups);
  useEffect(() => {
    let mounted = true;
    fetchAllGroups().then((group) => {
      if (mounted) {
        setAllGroupData(group);
      }
    });
    return () => (mounted = false);
  }, []);
  return (
    <View>
      {/* <Button title='CLICK' onPress={()=>navigation.navigate('CreateNewGroup')} /> */}
      {allGroups.map(({ groupName, groupDesc, groupImage, id , card}) => {
        return groupCards({
          cardTitle: groupName,
          cardDesc: groupDesc,
          cardImageLink: groupImage,
          id: id,
          navigation: navigation
        });
      })}
    </View>
  );
};

export default AllGroups;