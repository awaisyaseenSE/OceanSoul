import React from 'react';
import {DrawerContentScrollView} from '@react-navigation/drawer';
import {View, Text, Platform, StyleSheet, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import DrawerItemListCompo from './DrawerItemListCompo';
import navigationStrings from './navigationStrings';
import colors from '../styles/colors';
import fontFamily from '../styles/fontFamily';
import FastImage from 'react-native-fast-image';

function CustomDrawer(props) {
  const navigation = useNavigation();

  return (
    <>
      <DrawerContentScrollView
        style={{
          backgroundColor: colors.gray_light,
          width: '100%',
          paddingHorizontal: 12,
        }}
        showsVerticalScrollIndicator={false}>
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate(navigationStrings.ProfileScreen)
            }>
            <FastImage
              source={require('../assets/user-image.png')}
              style={styles.profileImage}
            />
          </TouchableOpacity>
        </View>
        <Text
          style={[
            styles.userNameText,
            {marginTop: Platform.OS === 'android' ? 10 : 0},
          ]}>
          Muhammad Awais
        </Text>
        <View style={{flex: 1, marginTop: 18}}>
          <DrawerItemListCompo
            image={require('../assets/apple.png')}
            title="Get Offer's"
            onPress={() => {}}
          />
        </View>
      </DrawerContentScrollView>
      <View
        style={{
          paddingVertical: 24,
          paddingHorizontal: 12,
          backgroundColor: colors.grayBg,
          shadowColor: colors.black,
          shadowOffset: {
            width: 0,
            height: 5,
          },
          shadowOpacity: 0.36,
          shadowRadius: 6.68,

          elevation: 11,
        }}>
        <DrawerItemListCompo
          image={require('../assets/lock.png')}
          title="Security & Privacy"
          style={{marginBottom: Platform.OS === 'ios' ? 8 : 2}}
          txtStyle={{color: colors.lineColor}}
          iconStyle={{tintColor: colors.lineColor}}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  userNameText: {
    fontSize: 14,
    color: colors.lineColor,
    fontFamily: fontFamily.rubik_medium,
    marginTop: 20,
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginTop: 12,
    marginBottom: 20,
  },
});

export default CustomDrawer;
