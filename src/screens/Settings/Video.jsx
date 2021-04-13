import React from 'react'
import { View, Text, Button } from 'react-native'

const Video = ({ navigation }) => {
  return (
    <View>
      <Text>VIDEO COMPONENT</Text>
      <Button title="CAMERA" onPress={() => navigation.navigate('SettingsCameraStack')}/>
    </View>
  )
}

export default Video
