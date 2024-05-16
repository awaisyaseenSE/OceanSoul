import {View, Text, ActivityIndicator} from 'react-native';
import React, {useEffect, useState} from 'react';
import ScreenComponent from '../components/ScreenComponent';
import colors from '../styles/colors';
import constants from '../constants/constants';

export default function SettingScreen() {
  return (
    <>
      <ScreenComponent style={{backgroundColor: colors.white_light2}}>
        <View>
          <Text>Setting Screen</Text>
        </View>
      </ScreenComponent>
    </>
  );
}
