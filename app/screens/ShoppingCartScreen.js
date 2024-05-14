import {View, Text} from 'react-native';
import React from 'react';
import ScreenComponent from '../components/ScreenComponent';
import colors from '../styles/colors';

export default function ShoppingCartScreen() {
  return (
    <>
      <ScreenComponent style={{backgroundColor: colors.white_light2}}>
        <View>
          <Text>Shopping Cart Screen</Text>
        </View>
      </ScreenComponent>
    </>
  );
}
