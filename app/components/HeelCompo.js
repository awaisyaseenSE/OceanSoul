import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import colors from '../styles/colors';
import LinearGradient from 'react-native-linear-gradient';
import fontFamily from '../styles/fontFamily';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const HeelCompo = () => {
  return (
    <View style={styles.container}>
      <LinearGradient
        style={styles.leftRow}
        start={{x: 0.4, y: 0.8}}
        end={{x: 0.4, y: 0.2}}
        colors={['#EFAD18', '#F4C46F']}
      />
      <View style={styles.rightRow}>
        <Image source={require('../assets/stars.png')} style={styles.stars} />
        <View
          style={{
            justifyContent: 'center',
            marginLeft: -70,
          }}>
          <Image source={require('../assets/heel.png')} style={styles.hell} />
        </View>
        <View style={styles.contentContainer}>
          <Text style={styles.heading}>Flat and Heels</Text>
          <Text style={styles.heading2}>Stand a chance to get rewarded</Text>
          <TouchableOpacity style={styles.btn} activeOpacity={0.8}>
            <Text style={styles.btnTxt}>Visit now</Text>
            <Image
              source={require('../assets/right-arrow.png')}
              style={styles.icon}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    width: '90%',
    alignSelf: 'center',
    borderRadius: 4,
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: colors.gray_light,
  },
  leftRow: {
    width: 20,
    height: screenHeight / 4,
    borderTopLeftRadius: 4,
    borderBottomLeftRadius: 4,
  },
  stars: {
    width: 90,
    height: screenHeight / 4.5,
    marginLeft: -10,
    zIndex: 0,
  },
  rightRow: {
    height: '90%',
    backgroundColor: colors.grayBg,
    alignSelf: 'center',
    flex: 1,
    marginRight: 10,
    borderTopRightRadius: 4,
    borderBottomRightRadius: 4,
    flexDirection: 'row',
  },
  hell: {
    width: 160,
    height: 160,
    resizeMode: 'contain',
  },
  heading: {
    fontSize: 18,
    fontFamily: fontFamily.medium,
    color: colors.black,
  },
  heading2: {
    fontSize: 14,
    fontFamily: fontFamily.regular,
    color: colors.black,
    marginVertical: 8,
  },
  contentContainer: {
    flex: 1,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    paddingRight: 6,
  },
  btn: {
    backgroundColor: colors.red,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 6,
    flexDirection: 'row',
    alignItems: 'center',
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
});

export default HeelCompo;
