import {View, Text, Image, StyleSheet, Alert, Dimensions} from 'react-native';
import React, {useState} from 'react';
import ScreenComponent from '../components/ScreenComponent';
import colors from '../styles/colors';
import TopHomeScreenCompo from '../components/TopHomeScreenCompo';
import TextInputWithLeftIconCompo from '../components/TextInputWithLeftIconCompo';
import HomeFilterCompo from '../components/HomeFilterCompo';
import ProductCategoryCompo from '../components/ProductCategoryCompo';
import FastImage from 'react-native-fast-image';
import HomeBannerCompo from '../components/HomeBannerCompo';
import DayOfTheDealCompo from '../components/DayOfTheDealCompo';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

export default function HomeScreen() {
  const [searchText, setSearchText] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  return (
    <ScreenComponent style={{backgroundColor: colors.white_light2}}>
      <TopHomeScreenCompo />
      <View style={styles.container}>
        <View style={{paddingHorizontal: 20}}>
          <TextInputWithLeftIconCompo
            value={searchText}
            onChangeText={text => {
              if (text.trim().length) {
                setSearchText(text);
              } else {
                setSearchText('');
              }
            }}
            maxLength={40}
            inputStyle={styles.inputStyle}
            clearIcon={searchText.length > 0 ? 'Clear' : ''}
            onPressClear={() => setSearchText('')}
            placeholder="Search any Product.."
            placeholderTextColor={colors.gray}
            leftIcon={require('../assets/search.png')}
            leftIconStyle={styles.inputLeftIcon}
          />
          <HomeFilterCompo />
        </View>
        <ProductCategoryCompo setSelectedCategory={setSelectedCategory} />
        <HomeBannerCompo />
        <DayOfTheDealCompo />
      </View>
    </ScreenComponent>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inputStyle: {
    backgroundColor: colors.white,
    borderWidth: 0.5,
    borderColor: colors.gray_light,
    shadowColor: colors.gray_dark,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 3.84,

    elevation: 5,
  },
  inputLeftIcon: {
    tintColor: colors.gray,
    width: 18,
    height: 18,
  },
  bannerStyle: {
    width: screenWidth,
    height: screenHeight / 4,
    borderRadius: 18,
  },
});
