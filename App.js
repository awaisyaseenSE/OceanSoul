import 'react-native-gesture-handler';
import React, {useEffect, useState} from 'react';
import AppNavigator from './app/navigation/AppNavigator';
import SplashScreen from './app/screens/SplashScreen';
import {getValue} from './app/helper/storeAndGetAsyncStorageValue';
import constants from './app/constants/constants';
import AuthNavigator from './app/navigation/AuthNavigator';
import MainNavigator from './app/navigation/MainNavigator';
import {LogBox} from 'react-native';

export default function App() {
  const [splashDone, setSplashDone] = useState(false);
  LogBox.ignoreAllLogs();

  console.disableYellowBox = true;

  useEffect(() => {
    checkOnBoarding();
    setTimeout(() => {
      setSplashDone(true);
    }, 2000);
  }, []);

  const checkOnBoarding = async () => {
    try {
      let key = 'onBoarding';
      const val = await getValue(key);
      if (val === 'true') {
        constants.onBoardingStatus = true;
      }
    } catch (error) {
      console.log('Error in getting onBoarding status in app.js: ', error);
    }
  };

  return <>{splashDone ? <MainNavigator /> : <SplashScreen />}</>;
}
