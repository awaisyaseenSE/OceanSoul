import {Dimensions, Platform} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import OnBoardingScreen from '../screens/OnBoardingScreen';
import BottomTabNavigator from './BottomTabNavigator';
import constants from '../constants/constants';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const {width, height} = Dimensions.get('window');

export default function AppNavigator() {
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator>
          {!constants.onBoardingStatus && (
            <Stack.Screen
              name="OnBoardingScreen"
              component={OnBoardingScreen}
              options={{
                headerShown: false,
              }}
            />
          )}
          <Stack.Screen
            name="BottomTabNavigator"
            component={BottomTabNavigator}
            options={{
              headerShown: false,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
