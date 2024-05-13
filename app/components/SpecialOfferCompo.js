import {View, Text, StyleSheet, Image} from 'react-native';
import React from 'react';
import colors from '../styles/colors';
import fontFamily from '../styles/fontFamily';

const SpecialOfferCompo = () => {
  return (
    <View style={styles.container}>
      <View style={{width: '30%'}}>
        <Image
          source={require('../assets/offer-icon.png')}
          style={styles.image}
        />
      </View>
      <View style={{width: '70%', paddingLeft: 20}}>
        <Text style={styles.txt}>Special Offers 😱</Text>
        <Text style={styles.txt1}>
          We make sure you get the offer you need at best prices
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '90%',
    backgroundColor: colors.white,
    alignSelf: 'center',
    borderRadius: 4,
    marginVertical: 12,
    borderWidth: 1,
    borderColor: colors.gray_light,
    paddingHorizontal: 20,
    paddingVertical: 12,
    flexDirection: 'row',
  },
  image: {
    width: 80,
    height: 80,
  },
  txt: {
    fontSize: 18,
    color: colors.black,
    fontFamily: fontFamily.medium,
  },
  txt1: {
    fontSize: 14,
    color: colors.black_light,
    fontFamily: fontFamily.regular,
  },
});

export default SpecialOfferCompo;
