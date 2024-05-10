import 'react-native-gesture-handler';
import {View, Text, SafeAreaView, StyleSheet} from 'react-native';
import React from 'react';
import HomeScreen from './app/screens/HomeScreen';
import fontFamily from './app/styles/fontFamily';
import SplashScreen from './app/screens/SplashScreen';
import OnBoardingScreen from './app/screens/OnBoardingScreen';

export default function App() {
  return (
    <View style={styles.container}>
      {/* <Text style={styles.heading}>Welcome,</Text>
        <Text style={styles.subheading}>Ocean Soul</Text> */}
      <SplashScreen />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  heading: {
    fontSize: 20,
    color: 'black',
    fontFamily: fontFamily.extra_bold,
  },
  subheading: {
    fontSize: 16,
    color: 'black',
    fontWeight: '700',
    marginTop: 8,
  },
});
