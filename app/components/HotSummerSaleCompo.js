import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import React from 'react';
import FastImage from 'react-native-fast-image';
import colors from '../styles/colors';
import fontFamily from '../styles/fontFamily';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const HotSummerSaleCompo = () => {
  return (
    <View style={styles.container}>
      <FastImage
        source={require('../assets/hot-summer-banner.png')}
        style={styles.poster}
        resizeMode="contain"
      />
      <View style={styles.mainContainer}>
        <Text style={styles.heading}>New Arrivals</Text>
        <View style={styles.row}>
          <Text style={styles.txt}>Summner' 25 collections</Text>
          <View>
            <TouchableOpacity style={styles.btn} activeOpacity={0.8}>
              <Text style={styles.btnTxt}>Visit All</Text>
              <Image
                source={require('../assets/right-arrow.png')}
                style={styles.icon}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '90%',
    alignItems: 'center',
    alignSelf: 'center',
  },
  poster: {
    width: screenWidth - 40,
    height: screenHeight / 4,
    borderRadius: 6,
    alignSelf: 'center',
    backgroundColor: colors.white,
  },
  mainContainer: {
    backgroundColor: colors.white,
    width: '100%',
    paddingBottom: 30,
    paddingTop: 14,
    paddingHorizontal: 14,
    borderBottomWidth: 2,
    borderBottomColor: colors.gray_light,
  },

  heading: {
    fontSize: 18,
    color: colors.black,
    fontFamily: fontFamily.semi_bold,
  },
  btn: {
    paddingHorizontal: 8,
    paddingVertical: 8,
    borderRadius: 6,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.red,
  },
  btnTxt: {
    fontSize: 14,
    fontFamily: fontFamily.semi_bold,
    color: colors.white,
  },
  icon: {
    width: 20,
    height: 20,
    tintColor: colors.white,
    resizeMode: 'contain',
    marginLeft: 6,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 4,
  },
  txt: {
    flex: 1,
    overflow: 'hidden',
    fontSize: 14,
    fontFamily: fontFamily.regular,
    color: colors.black,
    marginRight: 4,
  },
});

export default HotSummerSaleCompo;
