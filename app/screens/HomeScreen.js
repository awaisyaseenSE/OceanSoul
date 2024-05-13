import {
  View,
  Text,
  Image,
  StyleSheet,
  Alert,
  Dimensions,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import ScreenComponent from '../components/ScreenComponent';
import colors from '../styles/colors';
import TopHomeScreenCompo from '../components/TopHomeScreenCompo';
import TextInputWithLeftIconCompo from '../components/TextInputWithLeftIconCompo';
import HomeFilterCompo from '../components/HomeFilterCompo';
import ProductCategoryCompo from '../components/ProductCategoryCompo';
import FastImage from 'react-native-fast-image';
import HomeBannerCompo from '../components/HomeBannerCompo';
import DayOfTheDealCompo from '../components/DayOfTheDealCompo';
import ShowAllProductsCompo from '../components/ShowAllProductsCompo';
import SpecialOfferCompo from '../components/SpecialOfferCompo';
import HeelCompo from '../components/HeelCompo';
import TredingProductsBannerCompo from '../components/TredingProductsBannerCompo';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

export default function HomeScreen() {
  const [searchText, setSearchText] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');

  return (
    <>
      <ScreenComponent style={{backgroundColor: colors.white_light2}}>
        <TopHomeScreenCompo />
        <ScrollView showsVerticalScrollIndicator={false} style={{flex: 1}}>
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
            <ShowAllProductsCompo />
            <SpecialOfferCompo />
            <HeelCompo />
            <TredingProductsBannerCompo />
            <FastImage
              source={require('../assets/hot-summer-banner.png')}
              style={{
                width: screenWidth - 40,
                height: screenHeight / 4,
                borderRadius: 6,
                alignSelf: 'center',
                marginVertical: 4,
              }}
              resizeMode="contain"
            />
            <View style={{marginVertical: 12}} />
          </View>
        </ScrollView>
      </ScreenComponent>
    </>
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
