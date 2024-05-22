import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import fontFamily from '../styles/fontFamily';
import colors from '../styles/colors';

const SettingListCompo = ({title = '', onPress, icon}) => {
  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={0.6}
      onPress={onPress}>
      <View style={styles.row}>
        <View style={styles.iconContainer}>
          <Image source={icon} style={styles.icon} />
        </View>
        <Text style={styles.heading}>{title}</Text>
      </View>

      <Image source={require('../assets/next.png')} style={styles.nextIcon} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

    marginBottom: 10,
    paddingVertical: 4,
  },
  heading: {
    fontFamily: fontFamily.semi_bold,
    color: colors.black,
    fontSize: 14,
    marginLeft: 12,
  },
  nextIcon: {
    width: 14,
    height: 14,
    resizeMode: 'contain',
    tintColor: colors.gray_dark,
  },
  icon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
    tintColor: colors.white,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.red_dark2,
    borderRadius: 4,
  },
});

export default SettingListCompo;
