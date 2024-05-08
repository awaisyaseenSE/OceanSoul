import {View, Text, SafeAreaView, StyleSheet} from 'react-native';
import React from 'react';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.mainContainer}>
        <Text style={styles.heading}>Welcome,</Text>
        <Text style={styles.subheading}>Ocean Soul</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6A03C',
  },
  mainContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  heading: {
    fontSize: 20,
    color: 'black',
    fontWeight: '900',
  },
  subheading: {
    fontSize: 16,
    color: 'black',
    fontWeight: '700',
    marginTop: 8,
  },
});
