import {View, Text, StyleSheet, Image, Dimensions} from 'react-native';
import React from 'react';
import colors from '../styles/colors';
import fontFamily from '../styles/fontFamily';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const SponseredCompo = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Sponserd</Text>
      <Image
        source={require('../assets/hot-summer-banner.png')}
        style={styles.bannerStyle}
      />
      <Text
        style={[
          styles.heading,
          {
            fontSize: 14,
            fontFamily: fontFamily.medium,
          },
        ]}>
        up to 50% off
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '90%',
    backgroundColor: colors.white,
    alignSelf: 'center',
    marginTop: 12,
    paddingVertical: 14,
    borderRadius: 4,
    paddingHorizontal: 14,
  },
  heading: {
    fontSize: 18,
    fontFamily: fontFamily.semi_bold,
    color: colors.black,
    paddingHorizontal: 8,
  },
  bannerStyle: {
    marginVertical: 12,
    width: '100%',
    height: screenHeight / 4.5,
    resizeMode: 'contain',
    borderRadius: 6,
  },
});

export default SponseredCompo;
