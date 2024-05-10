import {
  View,
  Text,
  ImageBackground,
  StatusBar,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Platform,
} from 'react-native';
import React from 'react';
import colors from '../styles/colors';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import fontFamily from '../styles/fontFamily';
import Animated, {FadeInDown} from 'react-native-reanimated';
import LinearGradient from 'react-native-linear-gradient';

export default function GetStartedScreen() {
  return (
    <>
      <View style={{flex: 1}}>
        <StatusBar backgroundColor={colors.black} barStyle={'light-content'} />
        <ImageBackground
          source={require('../assets/unsplash.png')}
          style={{flex: 1}}>
          <View style={{flex: 1}}></View>
          <View style={{flex: 1.2}}>
            <LinearGradient
              style={{flex: 1}}
              start={{x: 0.5, y: 0}}
              end={{x: 0.5, y: 0.8}}
              colors={[
                'rgba(255,255,255,0)',
                'rgba(255,255,255,0.1)',
                'rgba(0, 0, 0, 0.4)',
                'rgba(0, 0, 0, 0.6)',
              ]}>
              <View style={[styles.contentContainer, {}]}>
                <Animated.Text
                  entering={FadeInDown.delay(400).springify()}
                  style={styles.heading}>
                  You want Authentic, here you go!
                </Animated.Text>
                <Animated.Text
                  style={styles.subheading}
                  entering={FadeInDown.delay(500).springify()}>
                  Find it here, buy it now!
                </Animated.Text>
                <Animated.View
                  style={{width: '100%', alignItems: 'center'}}
                  yle={styles.subheading}
                  entering={FadeInDown.delay(600).springify()}>
                  <TouchableOpacity style={styles.btn} activeOpacity={0.6}>
                    <Text style={styles.txt}>Start Explore</Text>
                  </TouchableOpacity>
                </Animated.View>
              </View>
            </LinearGradient>
          </View>
        </ImageBackground>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingBottom: 20,
    alignItems: 'center',
  },
  heading: {
    fontSize: 30,
    color: colors.white,
    fontFamily: fontFamily.semi_bold,
    marginBottom: 16,
    alignSelf: 'center',
    width: '80%',
    textAlign: 'center',
  },
  subheading: {
    fontSize: 16,
    color: colors.white_light,
    fontFamily: fontFamily.regular,
    marginBottom: '14%',
  },
  txt: {
    fontSize: 16,
    color: colors.white,
    fontFamily: fontFamily.bold,
  },
  btn: {
    backgroundColor: colors.red,
    width: '80%',
    paddingVertical: 16,
    alignItems: 'center',
    borderRadius: 14,
    marginBottom: '4%',
  },
});
