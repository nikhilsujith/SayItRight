import React from 'react';
import { StyleSheet, View } from 'react-native';
import Username from '../components/Username';
import HeaderWithoutSearchBar from '../components/HeaderWithoutSearchBar';


function UserDetails({ navigation, style, nav }) {
  return (
    <View style={styles.container}>
      <View style={styles.scrollArea}>
        <View style={styles.container}>
          <Username style={styles.Username} navigation={navigation}></Username>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerBig: {
    height: 100,
  },
  scrollArea: {
    backgroundColor: 'rgba(242,242,247,1)',
    flex: 1,
    marginHorizontal: 5,
  },
  scrollArea_contentContainerStyle: {
    height: 608,
  },
  image: {
    height: 200,
    alignSelf: 'center',
    marginTop: '2%',
    // marginLeft: 82,
    // marginRight: 82,
  },
  nameCard1: {
    height: 36,
    marginTop: 19,
    marginLeft: 7,
    marginRight: 8,
  },
  footer: {
    height: 73,
  },
});

export default UserDetails;
