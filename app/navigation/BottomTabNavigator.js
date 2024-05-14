import {View, StyleSheet, Platform, Image} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import colors from '../styles/colors';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import HomeScreen from '../screens/HomeScreen';
import WishListScreen from '../screens/WishListScreen';
import SearchScreen from '../screens/SearchScreen';
import ShoppingCartScreen from '../screens/ShoppingCartScreen';
import SettingScreen from '../screens/SettingScreen';

const BottomTab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  const insets = useSafeAreaInsets();
  const isIOS = Platform.OS === 'ios';
  return (
    <BottomTab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarActiveTintColor: colors.red,
        tabBarInactiveTintColor: colors.black,
        tabBarStyle: {
          backgroundColor: colors.white_light2,
          position: 'absolute',
          bottom: Platform.OS === 'android' ? 10 : insets.bottom - 16,
          borderTopWidth: 1.2,
          paddingVertical: 4,
          height: 60,
          paddingBottom: isIOS ? 14 : 16,
          borderColor: colors.gray,
          alignContent: 'center',
        },
      }}>
      <BottomTab.Screen
        component={HomeScreen}
        name="HomeScreen"
        options={{
          tabBarLabel: 'Home',
          tabBarLabelStyle: {
            textAlign: 'center',
          },
          tabBarIcon: ({focused}) => {
            return (
              <Image
                source={require('../assets/home.png')}
                style={[
                  styles.iconStyle,
                  {tintColor: focused ? colors.red : colors.black},
                ]}
              />
            );
          },
        }}
      />
      <BottomTab.Screen
        component={WishListScreen}
        name="WishListScreen"
        options={{
          tabBarLabel: 'Wishlist',
          tabBarLabelStyle: {textAlign: 'center'},
          tabBarIcon: ({focused}) => {
            return (
              <Image
                source={require('../assets/heart.png')}
                style={[
                  styles.iconStyle,
                  {tintColor: focused ? colors.red : colors.black},
                ]}
              />
            );
          },
        }}
      />
      <BottomTab.Screen
        component={ShoppingCartScreen}
        name="ShoppingCartScreen"
        options={{
          tabBarLabel: '',

          tabBarIcon: ({focused}) => {
            return (
              <View style={styles.shoppingCartContainer}>
                <Image
                  source={require('../assets/shopping-cart.png')}
                  style={[
                    styles.iconStyle,
                    {tintColor: focused ? colors.red : colors.black},
                  ]}
                />
              </View>
            );
          },
        }}
      />
      <BottomTab.Screen
        component={SearchScreen}
        name="SearchScreen"
        options={{
          tabBarLabel: 'Search',
          tabBarLabelStyle: {textAlign: 'center'},
          tabBarIcon: ({focused}) => {
            return (
              <Image
                source={require('../assets/search.png')}
                style={[
                  styles.iconStyle,
                  {tintColor: focused ? colors.red : colors.black},
                ]}
              />
            );
          },
        }}
      />
      <BottomTab.Screen
        component={SettingScreen}
        name="SettingScreen"
        options={{
          tabBarLabel: 'Setting',
          tabBarLabelStyle: {textAlign: 'center'},
          tabBarIcon: ({focused}) => {
            return (
              <Image
                source={require('../assets/settings.png')}
                style={[
                  styles.iconStyle,
                  {tintColor: focused ? colors.red : colors.black},
                ]}
              />
            );
          },
        }}
      />
    </BottomTab.Navigator>
  );
};

const styles = StyleSheet.create({
  iconStyle: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  profileImageStyle: {
    width: 26,
    height: 26,
    borderRadius: 13,
  },
  shoppingCartContainer: {
    width: 50,
    height: 50,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25,
    marginTop: -4,
    borderWidth: 1,
    borderColor: colors.gray_light,
  },
});

export default BottomTabNavigator;
