import React, { useState, useEffect } from 'react';
import { Button, Image, View, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { TouchableOpacity } from 'react-native-gesture-handler';

const SelectImage = ({ style, onImageSelected }) => {
  const [image, setImage] = useState(null);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const {
          status,
        } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true,
    });


    if (!result.cancelled) {
      setImage(result.uri);
      onImageSelected(result.base64);
    }
  };



  return (
    <View
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        ...style,
      }}
    >
      <TouchableOpacity
        onPress={pickImage}
      >
      {image && (
        <Image source={{ uri: image }} style={{ width: 200, height: 200, marginTop: 30, marginBottom: 20}} />
      )}
      </TouchableOpacity>
    </View>
  );
};

export default SelectImage;