import {View, StyleSheet, Image} from 'react-native';
import React from 'react';
import colors from '../styles/colors';

export default function SplashScreen() {
  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/logoo.png')}
        style={{width: 250, height: 250}}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
