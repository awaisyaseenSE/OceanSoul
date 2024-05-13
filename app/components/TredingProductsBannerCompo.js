import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import colors from '../styles/colors';
import fontFamily from '../styles/fontFamily';
import {rows} from 'deprecated-react-native-prop-types/DeprecatedTextInputPropTypes';

const TredingProductsBannerCompo = () => {
  return (
    <View style={styles.container}>
      <View
        style={{
          flex: 1.5,
          overflow: 'hidden',
        }}>
        <Text style={styles.heading}>Trending Products</Text>
        <View style={styles.row}>
          <Image
            source={require('../assets/calendar.png')}
            style={styles.icon}
          />
          <Text style={styles.dateTxt}>Last date 29/05/24</Text>
        </View>
      </View>
      <View style={styles.row2}>
        <TouchableOpacity style={styles.btn} activeOpacity={0.8}>
          <Text style={styles.btnTxt}>Visit now</Text>
          <Image
            source={require('../assets/right-arrow.png')}
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.red_light,
    width: '90%',
    alignSelf: 'center',
    marginVertical: 14,
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderRadius: 6,
    flexDirection: 'row',
  },
  heading: {
    fontSize: 18,
    color: colors.white,
    fontFamily: fontFamily.semi_bold,
    marginBottom: 16,
  },
  icon: {
    width: 20,
    height: 20,
    tintColor: colors.white,
    marginRight: 10,
  },
  dateTxt: {
    fontSize: 14,
    color: colors.white,
    fontFamily: fontFamily.medium,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  row2: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  btn: {
    paddingHorizontal: 8,
    paddingVertical: 8,
    borderRadius: 6,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: colors.white,
  },
  btnTxt: {
    fontSize: 14,
    fontFamily: fontFamily.semi_bold,
    color: colors.white,
  },
});

export default TredingProductsBannerCompo;
