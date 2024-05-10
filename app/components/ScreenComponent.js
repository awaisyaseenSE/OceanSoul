import {
  StyleSheet,
  SafeAreaView,
  Platform,
  View,
  StatusBar,
} from 'react-native';
import React from 'react';
import colors from '../styles/colors';

export default function ScreenComponent({
  style,
  children,
  backgroundColor = 'black',
  content = Platform.OS === 'android' ? 'light-content' : 'dark-content',
}) {
  return (
    <>
      <StatusBar barStyle={content} backgroundColor={backgroundColor} />
      {Platform.OS === 'ios' ? (
        <SafeAreaView style={[styles.screen, style]}>{children}</SafeAreaView>
      ) : (
        <View style={[styles.screen, style]}>{children}</View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingVertical: Platform.OS === 'android' ? 5 : 0,
    backgroundColor: colors.white,
  },
});
