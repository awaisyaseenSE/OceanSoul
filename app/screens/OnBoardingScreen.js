import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  Dimensions,
  Platform,
} from 'react-native';
import React, {useRef, useState} from 'react';
import ScreenComponent from '../components/ScreenComponent';
import colors from '../styles/colors';
import fontFamily from '../styles/fontFamily';
import Animated, {FadeInDown} from 'react-native-reanimated';
import {StackActions, useNavigation} from '@react-navigation/native';
import navigationStrings from '../navigation/navigationStrings';
import {storeValue} from '../helper/storeAndGetAsyncStorageValue';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

export default function OnBoardingScreen() {
  const navigation = useNavigation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef(null);
  const onBoardingData = [
    {
      id: 1,
      title: 'Shop endless possibilities',
      desc: 'Welcome to our online shop! Explore endless choices in fashion, electronics, and more. Start your journey now!',
      img: require('../assets/onBoarding/onBoarding-1.png'),
    },
    {
      id: 2,
      title: 'Effortless shopping',
      desc: 'Shop with ease! Effortless shopping made easy! Browse and buy with a tap. Your fingertips, your store.',
      img: require('../assets/onBoarding/onBoarding-2.png'),
    },
    {
      id: 3,
      title: 'Get your order',
      desc: 'Dive into your shopping cravings! Explore a world of options in fashion, electronics, and more. Let your journey begin!',
      img: require('../assets/onBoarding/onBoarding-3.png'),
    },
  ];

  const handleOnPressNext = () => {
    if (currentIndex == 1) {
      setCurrentIndex(2);
    } else if (currentIndex == 2) {
      setCurrentIndex(3);
    } else if (currentIndex == 3) {
      handleFinishOnBoarding();
    } else {
      setCurrentIndex(1);
    }
  };
  const handleOnPressPrevious = () => {
    if (currentIndex == 2) {
      setCurrentIndex(1);
    } else if (currentIndex == 3) {
      setCurrentIndex(2);
    } else {
      setCurrentIndex(1);
    }
  };

  const handleFinishOnBoarding = async () => {
    try {
      console.log('Finish on boarding func is called!');
      let key = 'onBoarding';
      await storeValue(key, 'true');
      navigation.dispatch(StackActions.replace('MainRoutes'));
    } catch (error) {
      console.log('Error in finish on boarding screen function: ', error);
    }
  };

  const renderItem = ({item, index}) => {
    return (
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <View
          style={[
            index + 1 === currentIndex ? styles.line : styles.dot,
            {
              marginHorizontal: index === 1 ? 4 : 0,
            },
          ]}
        />
      </View>
    );
  };

  const onViewableItemsChanged = useRef(({viewableItems}) => {
    if (viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index + 1);
    }
  }).current;

  const viewabilityConfig = {
    itemVisiblePercentThreshold: 50,
  };

  const renderMainData = ({item, index}) => {
    return (
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          overflow: 'hidden',
          width: screenWidth,
        }}>
        <Image
          source={item?.img}
          style={{
            width: screenWidth,
            height: 200,
          }}
        />
        <View style={{paddingHorizontal: 22, alignItems: 'center'}}>
          <Text style={styles.heading}>{item?.title}</Text>
          <Text
            style={{
              fontSize: 14,
              color: colors.gray_dark,
              textAlign: 'center',
            }}>
            {item?.desc}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <ScreenComponent style={{backgroundColor: colors.white}}>
      <View style={styles.container}>
        <OnBoardingTopCompo
          selectedOnBoarding={currentIndex}
          handleFinishOnBoarding={handleFinishOnBoarding}
        />
        <View style={styles.contentContainer}>
          <FlatList
            ref={flatListRef}
            data={onBoardingData}
            renderItem={renderMainData}
            keyExtractor={(item, index) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            pagingEnabled
            onViewableItemsChanged={onViewableItemsChanged}
            viewabilityConfig={viewabilityConfig}
          />
        </View>
        <View
          style={[
            styles.footer,
            {
              marginBottom: Platform.OS === 'android' ? 10 : 2,
            },
          ]}>
          {currentIndex !== 1 ? (
            <TouchableOpacity
              onPress={handleOnPressPrevious}
              style={{width: '14%'}}
              activeOpacity={0.6}>
              <Text style={[styles.text, {color: colors.gray}]}>Prev</Text>
            </TouchableOpacity>
          ) : (
            <View style={{width: '14%'}} />
          )}
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <FlatList
              data={onBoardingData}
              renderItem={renderItem}
              keyExtractor={(item, index) => item.id}
              horizontal
              showsHorizontalScrollIndicator={false}
            />
          </View>
          <TouchableOpacity onPress={handleOnPressNext} activeOpacity={0.6}>
            <Text style={[styles.text, {color: colors.red}]}>
              {currentIndex == 3 ? 'Get Started' : 'Next'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScreenComponent>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  subHeading: {
    fontSize: 14,
    color: colors.gray,
    fontFamily: fontFamily.medium,
    textAlign: 'center',
    width: '90%',
    alignSelf: 'center',
  },
  heading: {
    fontSize: 20,
    color: colors.black,
    fontFamily: fontFamily.bold,
    marginTop: 20,
    marginBottom: 12,
  },
  text: {
    fontSize: 16,
    color: colors.black,
    fontFamily: fontFamily.semi_bold,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  image: {
    width: '90%',
    height: 260,
    resizeMode: 'contain',
  },
  contentContainer: {
    flex: 1,
    // alignItems: 'center',
    justifyContent: 'center',
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.gray,
  },
  line: {
    width: 36,
    height: 8,
    borderRadius: 22,
    backgroundColor: colors.black_light,
  },
});

const OnBoardingTopCompo = ({selectedOnBoarding, handleFinishOnBoarding}) => {
  return (
    <View style={[styles.row, {paddingHorizontal: 20}]}>
      <Text style={styles.text}>
        {selectedOnBoarding}
        <Text style={{color: colors.gray}}>/3</Text>
      </Text>
      <TouchableOpacity onPress={handleFinishOnBoarding}>
        <Text style={styles.text}>Skip</Text>
      </TouchableOpacity>
    </View>
  );
};
