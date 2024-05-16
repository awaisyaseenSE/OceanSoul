import {Dimensions, Platform} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import OnBoardingScreen from '../screens/OnBoardingScreen';
import BottomTabNavigator from './BottomTabNavigator';
import constants from '../constants/constants';
import DealProductsScreen from '../screens/offers/DealProductsScreen';
import TrendingProductsScreen from '../screens/offers/TrendingProductsScreen';
import NewArrivalProductsScreen from '../screens/offers/NewArrivalProductsScreen';
import CustomDrawer from './CustomDrawer';
import ProfileScreen from '../screens/Profile/ProfileScreen';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const {width, height} = Dimensions.get('window');

const DrawerNavigator = () => (
  <>
    <Drawer.Navigator
      // initialRouteName="TabRoutes"
      // screenOptions={{
      //   headerShown: false,
      //   drawerPosition: 'left',
      //   drawerActiveBackgroundColor: 'transparent',
      //   drawerInactiveBackgroundColor: 'transparent',
      // }}
      screenOptions={{
        drawerStyle: {
          width: width * 0.7,
          alignSelf: 'center',
        },
        sceneContainerStyle: {
          // backgroundColor: '#FFFFFF33',
        },
        swipeEdgeWidth: Platform.OS === 'android' && 100,
        headerShown: false,
        drawerPosition: 'left',
        drawerActiveBackgroundColor: 'transparent',
        drawerInactiveBackgroundColor: 'transparent',
        drawerActiveTintColor: 'red',
        drawerInactiveTintColor: 'green',
        overlayColor: 'transparent',
      }}
      drawerContent={props => <CustomDrawer {...props} />}>
      {/* <Drawer.Screen
        name="TabRoutes"
        component={TabRoutes}
        options={{headerShown: false}}
      /> */}
      <Drawer.Screen
        name="BottomTabNavigator"
        component={BottomTabNavigator}
        options={{headerShown: false}}
      />
    </Drawer.Navigator>
  </>
);

export default function AppNavigator() {
  return (
    <>
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
          name="MainRoutes"
          component={DrawerNavigator}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="DealProductsScreen"
          component={DealProductsScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="TrendingProductsScreen"
          component={TrendingProductsScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="NewArrivalProductsScreen"
          component={NewArrivalProductsScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="ProfileScreen"
          component={ProfileScreen}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </>
  );
}
