import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React from 'react';
import ScreenComponent from '../components/ScreenComponent';
import colors from '../styles/colors';
import fontFamily from '../styles/fontFamily';
import SettingListCompo from '../components/SettingListCompo';
import {useNavigation} from '@react-navigation/native';
import navigationStrings from '../navigation/navigationStrings';
import FastImage from 'react-native-fast-image';

export default function SettingScreen() {
  const navigation = useNavigation();
  return (
    <>
      <ScreenComponent style={{backgroundColor: colors.white_light2}}>
        <ScrollView style={{flex: 1}} showsVerticalScrollIndicator={false}>
          <View style={styles.container}>
            <Text style={styles.heading}>Settings</Text>

            <View style={styles.profileDetailCard}>
              <Image
                source={require('../assets/Path.png')}
                style={styles.backgroundImage}
              />
              <Image
                source={require('../assets/Path1.png')}
                style={styles.backgroundImage}
              />
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  paddingHorizontal: 20,
                }}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() =>
                      navigation.navigate(navigationStrings.ProfileScreen)
                    }>
                    <FastImage
                      source={{
                        uri: 'https://cdn.pixabay.com/photo/2017/03/27/13/28/man-2178721_1280.jpg',
                      }}
                      style={styles.profileImageStyle}
                    />
                  </TouchableOpacity>
                  <View style={{marginLeft: 20}}>
                    <Text
                      style={[
                        styles.profileTextStyle,
                        {
                          fontFamily: fontFamily.semi_bold,
                        },
                      ]}>
                      Awais Yaseen
                    </Text>
                    <TouchableOpacity
                      style={styles.btnStyle}
                      activeOpacity={0.5}
                      onPress={() =>
                        navigation.navigate(navigationStrings.ProfileScreen)
                      }>
                      <Text style={styles.profileTextStyle}>Edit Profile</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>

            <SettingListCompo
              icon={require('../assets/bell.png')}
              title="Notifications"
            />
            <SettingListCompo
              icon={require('../assets/lock.png')}
              title="Change Password"
            />
            <SettingListCompo
              icon={require('../assets/call.png')}
              title="Contact Us"
            />
            <SettingListCompo
              icon={require('../assets/privacy.png')}
              title="Privacy"
            />
            <SettingListCompo
              icon={require('../assets/terms-and-conditions.png')}
              title="Terms and condition"
            />
            <SettingListCompo
              icon={require('../assets/help-us.png')}
              title="Help center"
            />
            <SettingListCompo
              icon={require('../assets/about-us.png')}
              title="About us"
            />
            <SettingListCompo
              icon={require('../assets/exit.png')}
              title="Logout"
            />

            <View style={{marginVertical: 80}} />
          </View>
        </ScrollView>
      </ScreenComponent>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  heading: {
    fontSize: 20,
    color: colors.black,
    fontFamily: fontFamily.bold,
    marginBottom: 14,
  },
  profileDetailCard: {
    backgroundColor: colors.gray,
    position: 'relative',
    width: '100%',
    height: '14%',
    overflow: 'hidden',
    borderRadius: 22,
    marginBottom: 20,
  },
  backgroundImage: {
    position: 'absolute',
    width: '100%',
    height: '70%',
    resizeMode: 'stretch', // Adjust this property as needed
    bottom: 0,
  },
  profileImageStyle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 1.5,
    borderColor: colors.white,
  },

  profileTextStyle: {
    fontSize: 14,
    color: colors.white,
    fontFamily: fontFamily.medium,
  },
  btnStyle: {
    borderWidth: 1,
    borderColor: colors.white,
    alignItems: 'center',
    paddingVertical: 2,
    borderRadius: 4,
    marginTop: 4,
    justifyContent: 'center',
  },
});
