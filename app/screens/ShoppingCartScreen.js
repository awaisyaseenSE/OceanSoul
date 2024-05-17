import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import ScreenComponent from '../components/ScreenComponent';
import colors from '../styles/colors';
import FastImage from 'react-native-fast-image';

export default function ShoppingCartScreen() {
  return (
    <>
      <ScreenComponent style={{backgroundColor: colors.white_light2}}>
        <View style={{flex: 1, paddingHorizontal: 20}}>
          <Text>Shopping Cart Screen</Text>
        </View>
      </ScreenComponent>
    </>
  );
}

const styles = StyleSheet.create({});
