import React from "react";
import { AdMobBanner } from "expo-ads-admob";

const BannerAds = () => {
  return (
    <AdMobBanner
      adUnitID="ca-app-pub-3940256099942544/2934735716" // Test ID, Replace with your-admob-unit-id
      testDeviceId="EMULATOR"
      servePersonalizedAds // true or false
      onDidFailToReceiveAdWithError={() => this.bannerError}
    />
  );
};

export default BannerAds;
