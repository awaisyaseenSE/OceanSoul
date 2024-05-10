import 'react-native-gesture-handler';
import {View, StyleSheet} from 'react-native';
import React from 'react';
import HomeScreen from './app/screens/HomeScreen';

export default function App() {
  return (
    <View style={styles.container}>
      <HomeScreen />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
