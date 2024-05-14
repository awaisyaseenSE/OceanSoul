import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AuthNavigator from './AuthNavigator';
import AppNavigator from './AppNavigator';

function MainNavigator() {
  let isAppshow = false;
  return (
    <NavigationContainer>
      {isAppshow ? <AppNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
}

export default MainNavigator;
