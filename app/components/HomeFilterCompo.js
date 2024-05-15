import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import fontFamily from '../styles/fontFamily';
import colors from '../styles/colors';

const HomeFilterCompo = ({onPressSort, onPressFilter}) => {
  return (
    <View style={[styles.container, {marginTop: 12}]}>
      <Text style={styles.heading}>All Featured</Text>
      <View style={styles.container}>
        <TouchableOpacity
          style={[styles.container, styles.iconContainer]}
          onPress={onPressSort}>
          <Text style={styles.txt}>Sort</Text>
          <Image source={require('../assets/sort.png')} style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.container, styles.iconContainer, {marginLeft: 8}]}
          onPress={onPressFilter}>
          <Text style={styles.txt}>Filter</Text>
          <Image source={require('../assets/filter.png')} style={styles.icon} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  heading: {
    fontFamily: fontFamily.semi_bold,
    color: colors.black,
    fontSize: 20,
  },
  txt: {
    fontFamily: fontFamily.semi_bold,
    color: colors.black,
    fontSize: 12,
    marginRight: 4,
  },
  icon: {
    width: 18,
    height: 18,
  },
  iconContainer: {
    backgroundColor: '#EFEFEF',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
    shadowColor: colors.gray_dark,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 3.84,

    elevation: 5,
    borderWidth: 0.5,
    borderColor: colors.gray_light,
  },
});

export default HomeFilterCompo;
