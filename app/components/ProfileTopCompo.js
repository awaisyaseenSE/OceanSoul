import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import colors from '../styles/colors';
import {useNavigation} from '@react-navigation/native';
import fontFamily from '../styles/fontFamily';
import DropShadow from 'react-native-drop-shadow';

const ProfileTopCompo = ({title = '', onPress}) => {
  const navigation = useNavigation();
  if (!onPress) {
    onPress = () => navigation.goBack();
  }
  return (
    <View style={styles.container}>
      <DropShadow style={styles.shadowStyle}>
        <TouchableOpacity
          style={styles.backIconContainer}
          activeOpacity={0.8}
          onPress={onPress}>
          <Image source={require('../assets/back.png')} style={styles.icon} />
        </TouchableOpacity>
      </DropShadow>
      <Text style={styles.heading}>{title}</Text>
      <View
        style={[styles.backIconContainer, {backgroundColor: 'transparent'}]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  backIconContainer: {
    width: 34,
    height: 34,
    backgroundColor: colors.white,
    borderRadius: 4,
    transform: [{rotate: '45deg'}],
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: colors.gray_light,
  },
  icon: {
    width: 16,
    height: 16,
    resizeMode: 'contain',
    tintColor: colors.black,
    transform: [{rotate: '-45deg'}],
  },
  heading: {
    fontSize: 16,
    fontFamily: fontFamily.semi_bold,
    color: colors.black,
  },
  shadowStyle: {
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

export default ProfileTopCompo;
