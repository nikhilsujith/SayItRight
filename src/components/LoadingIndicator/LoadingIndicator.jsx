import React from 'react';
import { View, Text, ActivityIndicator } from 'react-native';

const LoadingIndicator = () => {
    return (
      <View style={{ flex: 1 }}>
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <ActivityIndicator size="large" />
          <Text>Loading</Text>
        </View>
      </View>
    );
  };
export default LoadingIndicator;