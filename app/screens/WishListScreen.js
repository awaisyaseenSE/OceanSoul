import {View, Text} from 'react-native';
import React from 'react';
import ScreenComponent from '../components/ScreenComponent';
import colors from '../styles/colors';

import {RAPID_API_KEY} from '@env';

export default function WishListScreen() {
  return (
    <>
      <ScreenComponent style={{backgroundColor: colors.white_light2}}>
        <View>
          <Text>Wish List Screen {RAPID_API_KEY} </Text>
        </View>
      </ScreenComponent>
    </>
  );
}
