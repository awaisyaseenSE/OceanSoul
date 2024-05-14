import {View, Text} from 'react-native';
import React from 'react';
import ScreenComponent from '../components/ScreenComponent';
import colors from '../styles/colors';

export default function SearchScreen() {
  return (
    <>
      <ScreenComponent style={{backgroundColor: colors.white_light2}}>
        <View>
          <Text>Search Screen</Text>
        </View>
      </ScreenComponent>
    </>
  );
}
