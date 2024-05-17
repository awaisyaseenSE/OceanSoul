import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import colors from '../styles/colors';
import fontFamily from '../styles/fontFamily';
import FastImage from 'react-native-fast-image';
import constants from '../constants/constants';

const TopHomeScreenCompo = ({onPressLeft, onPressRight}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.iconContainer} onPress={onPressLeft}>
        <Image source={require('../assets/drawer.png')} style={styles.icon} />
      </TouchableOpacity>
      <Image source={require('../assets/logo.png')} style={styles.logo} />
      <TouchableOpacity onPress={onPressRight}>
        <FastImage
          source={{
            uri: constants.userProfileImageURl,
          }}
          style={styles.profileImage}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  icon: {
    width: 24,
    height: 24,
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 36 / 2,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.pink_light,
  },
  logo: {
    width: 60,
    height: 60,
  },
  profileImage: {
    width: 36,
    height: 36,
    borderRadius: 36 / 2,
    backgroundColor: colors.gray_dark,
  },
});

export default TopHomeScreenCompo;
