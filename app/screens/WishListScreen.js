import {View, Text} from 'react-native';
import React from 'react';
import ScreenComponent from '../components/ScreenComponent';
import colors from '../styles/colors';
// import {REACT_APP_RAPID_API_KEY} from '@env';

export default function WishListScreen() {
  console.log(process.env.RAPID_API_KEY);
  return (
    <>
      <ScreenComponent style={{backgroundColor: colors.white_light2}}>
        <View>
          <Text>Wish List Screen</Text>
        </View>
      </ScreenComponent>
    </>
  );
}
