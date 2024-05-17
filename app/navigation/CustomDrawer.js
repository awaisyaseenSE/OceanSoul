import React from 'react';
import {DrawerContentScrollView} from '@react-navigation/drawer';
import {View, Text, Platform, StyleSheet, ImageBackground} from 'react-native';
import DrawerItemListCompo from './DrawerItemListCompo';
import navigationStrings from './navigationStrings';
import colors from '../styles/colors';
import fontFamily from '../styles/fontFamily';
import FastImage from 'react-native-fast-image';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import constants from '../constants/constants';

function CustomDrawer({navigation}) {
  const insect = useSafeAreaInsets();

  return (
    <>
      <ImageBackground
        source={{
          // uri: 'https://t3.ftcdn.net/jpg/04/55/53/78/360_F_455537818_2AwVoujHe2gH7IRYTgrZ932Nt4MdwTXD.jpg',
          uri: 'https://t4.ftcdn.net/jpg/06/44/52/09/360_F_644520910_0qAcxInM49OxJaDZ4lhmh3TmHEIj4sOr.jpg',
        }}
        style={{width: '100%', height: 200, backgroundColor: colors.gray}}>
        <View style={{flex: 1, backgroundColor: 'rgba(0,0,0,0.4)'}}>
          <View
            style={{
              paddingTop: Platform.OS === 'ios' ? insect.top : 10,
              paddingHorizontal: 12,
            }}>
            <FastImage
              source={{uri: constants.userProfileImageURl}}
              style={styles.profileImage}
            />
            <Text style={styles.userNameText}>Muhammad Awais</Text>
            <Text
              style={[
                styles.userNameText,
                {
                  marginTop: 6,
                  color: colors.gray_light,
                },
              ]}>
              awaisyaseen.se@gmail.com
            </Text>
          </View>
        </View>
      </ImageBackground>
      <DrawerContentScrollView
        style={{
          backgroundColor: colors.gray_light,
          width: '100%',
        }}
        showsVerticalScrollIndicator={false}>
        <View
          style={{
            backgroundColor: 'red',
            marginTop: Platform.OS === 'ios' ? -insect.top : 0,
          }}></View>
        <View style={{flex: 1, marginTop: 18}}>
          <DrawerItemListCompo
            image={require('../assets/user.png')}
            title="Profile"
            onPress={() => {
              navigation.navigate(navigationStrings.ProfileScreen);
              navigation.closeDrawer();
            }}
          />
          <DrawerItemListCompo
            image={require('../assets/check-out.png')}
            title="Checkout Detail"
            onPress={() => {
              navigation.navigate(navigationStrings.CheckoutScreen);
              navigation.closeDrawer();
            }}
          />
        </View>
      </DrawerContentScrollView>
      <View style={styles.drawerFooter}>
        <DrawerItemListCompo
          image={require('../assets/exit.png')}
          title="Logout"
          style={{marginBottom: Platform.OS === 'ios' ? 8 : 2}}
          txtStyle={{color: colors.black, fontFamily: fontFamily.semi_bold}}
          iconStyle={{tintColor: colors.black}}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  userNameText: {
    fontSize: 14,
    color: colors.white,
    fontFamily: fontFamily.semi_bold,
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginTop: 12,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: colors.white,
  },
  drawerFooter: {
    paddingVertical: 24,
    backgroundColor: colors.white_light2,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.36,
    shadowRadius: 6.68,

    elevation: 11,
  },
});

export default CustomDrawer;
