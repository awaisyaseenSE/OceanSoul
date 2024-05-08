import {View, Text} from 'react-native';
import React from 'react';
import LottieView from 'lottie-react-native';

export default function HomeScreen() {
  return (
    <View style={{marginTop: 20}}>
      <LottieView
        source={require('../assets/animation/loader.json')}
        style={{width: 80, height: 80}}
        loop
        autoPlay
      />
    </View>
  );
}
