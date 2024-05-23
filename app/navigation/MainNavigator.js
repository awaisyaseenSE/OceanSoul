import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AuthNavigator from './AuthNavigator';
import AppNavigator from './AppNavigator';
import {getValue} from '../helper/storeAndGetAsyncStorageValue';
import SplashScreen from '../screens/SplashScreen';
import {AuthProvider, useAuth} from '../auth/AuthContext';

function MainNavigator() {
  const [isHomeshow, setIsHomeshow] = useState(null);
  const {isLoggedIn, login, logout} = useAuth();

  const checkLogin = async () => {
    try {
      let key = 'login';
      const val = await getValue(key);
      if (val === 'true') {
        setIsHomeshow(true);
      } else {
        setIsHomeshow(false);
      }
    } catch (error) {
      console.log('Error in getting Login status in Main Navigator: ', error);
    }
  };

  useEffect(() => {
    checkLogin();
  }, [isLoggedIn, login, logout]);

  if (isHomeshow === null) {
    return <SplashScreen />;
  }

  return (
    <NavigationContainer>
      {isHomeshow ? <AppNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
}

export default MainNavigator;
