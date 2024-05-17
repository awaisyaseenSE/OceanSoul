import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import ScreenComponent from '../components/ScreenComponent';
import colors from '../styles/colors';
import fontFamily from '../styles/fontFamily';
import SettingListCompo from '../components/SettingListCompo';

export default function SettingScreen() {
  return (
    <>
      <ScreenComponent style={{backgroundColor: colors.white_light2}}>
        <View style={styles.container}>
          <Text style={styles.heading}>Settings</Text>
          <SettingListCompo
            icon={require('../assets/apple.png')}
            title="Edit Profile"
          />
          <SettingListCompo
            icon={require('../assets/apple.png')}
            title="Edit Profile"
          />
        </View>
      </ScreenComponent>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  heading: {
    fontSize: 20,
    color: colors.black,
    fontFamily: fontFamily.bold,
    marginBottom: 50,
  },
});
