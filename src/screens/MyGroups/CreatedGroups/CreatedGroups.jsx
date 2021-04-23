import React, { useState, useEffect } from "react";
import { View, Text, Button, Footer, Icon, Fab } from "native-base";
import { FloatingActionButton, GroupCard } from "../../../components";
import { fetchCreatedGroups } from "../../../service/User/UserService";
import { createStackNavigator } from "@react-navigation/stack";
import { TouchableOpacity } from "react-native-gesture-handler";
import { currentSession } from "../../../util/AmplifyCurrentSession";

const RootStack = createStackNavigator();
const MainStack = createStackNavigator();

const groupCards = ({ cardTitle, cardDesc, cardImageLink, id }) => {
  // //console.log(cardImageLink);
  const x =
    "https://say-it-right-bucket.s3.amazonaws.com/testPool/test.jpeg-882943ae-9e92-4458-9f5e-25406adfb02d";
  return (
    <TouchableOpacity onLongPress={() => alert('Make a POST request to delete record from DB + immediate refresh to update UI')}>
      <GroupCard
        key={id}
        cardTitle={cardTitle}
        cardDesc={cardDesc}
        cardImageLink={x}
      />
    </TouchableOpacity>
  );
};

const CreatedGroups = ({ navigation }) => {
  const [myGroups, setMyGroupData] = useState([]);
  const [currentId, setCurrentId] = useState('');

  useEffect( async () => {
    let mounted = true;
    await setCurrentId(currentSession());
    fetchCreatedGroups().then((group) => {
      if (mounted) {
        setMyGroupData(group);
      }
    });
    return () => (mounted = false);
  }, []);


  return (
    <View>
      <Text>Hi</Text>
      {/* {myGroups.map(({ groupName, groupDesc, groupImage, id }) => {
        return groupCards({
          cardTitle: groupName,
          cardDesc: groupDesc,
          cardImageLink: groupImage,
          id: id,
        });
      })} */}
    </View>
  );
};

// const EnrolledGroups = ({ navigation }) => {
//   const [myGroups, setMyGroupData] = useState([]);
//   useEffect(() => {
//     let mounted = true;
//     fetchCreatedGroups().then((group) => {
//       if (mounted) {
//         setMyGroupData(group);
//       }
//     });
//     return () => (mounted = false);
//   }, []);
//   return (
//     <View>
//       {/* {myGroups.map(({ groupName, groupDesc, groupImage, id }) => {
//         return groupCards({
//           cardTitle: groupName,
//           cardDesc: groupDesc,
//           cardImageLink: groupImage,
//           id: id,
//         });
//       })} */}
//     </View>
//     // <RootStack.Navigator mode="modal">
//     //   <RootStack.Screen
//     //     name="Main"
//     //     component={MainStackScreen}
//     //     options={{ headerShown: false }}
//     //   />
//     //   <RootStack.Screen name="MyModal" component={ModalScreen} />
//     // </RootStack.Navigator>
//   );
// };

export default CreatedGroups;
