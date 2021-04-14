import React from "react";
import { View, Text, Dimensions } from "react-native";
import { AdMobBanner } from "expo-ads-admob";

const BannerAds = () => {
  return (
    <View
      style={{
        backgroundColor: "black",
        width: Dimensions.get("window").width,
      }}
    >
      <AdMobBanner
        adUnitID="ca-app-pub-3940256099942544/2934735716" // Test ID, Replace with your-admob-unit-id
        testDeviceId="EMULATOR"
        servePersonalizedAds // true or false
        onDidFailToReceiveAdWithError={() => this.bannerError}
      />
    </View>
  );
};

export default BannerAds;
