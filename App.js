import 'react-native-gesture-handler';
import {View, Text, SafeAreaView, StyleSheet} from 'react-native';
import React from 'react';
import HomeScreen from './app/screens/HomeScreen';
import fontFamily from './app/styles/fontFamily';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.mainContainer}>
        <Text style={styles.heading}>Welcome,</Text>
        <Text style={styles.subheading}>Ocean Soul</Text>
        <HomeScreen />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainContainer: {
    flex: 1,
    paddingHorizontal: 20,
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
