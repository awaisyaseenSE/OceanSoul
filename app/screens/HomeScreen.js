import {View, StyleSheet, Dimensions, ScrollView, Text} from 'react-native';
import React, {useState} from 'react';
import ScreenComponent from '../components/ScreenComponent';
import colors from '../styles/colors';
import TopHomeScreenCompo from '../components/TopHomeScreenCompo';
import TextInputWithLeftIconCompo from '../components/TextInputWithLeftIconCompo';
import HomeFilterCompo from '../components/HomeFilterCompo';
import ProductCategoryCompo from '../components/ProductCategoryCompo';
import HomeBannerCompo from '../components/HomeBannerCompo';
import DayOfTheDealCompo from '../components/DayOfTheDealCompo';
import ShowAllProductsCompo from '../components/ShowAllProductsCompo';
import SpecialOfferCompo from '../components/SpecialOfferCompo';
import HeelCompo from '../components/HeelCompo';
import TredingProductsBannerCompo from '../components/TredingProductsBannerCompo';
import HotSummerSaleCompo from '../components/HotSummerSaleCompo';
import SponseredCompo from '../components/SponseredCompo';
import HomeSearchDataCompo from '../components/HomeSearchDataCompo';
import constants from '../constants/constants';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

export default function HomeScreen() {
  const [searchText, setSearchText] = useState('');
  const [showSearchData, setShowSearchData] = useState(false);
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [country, setCountry] = useState('US');
  const [loadingMore, setLoadingMore] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const handleOnPressSearch = async () => {
    if (searchText.length > 2) {
      let res = await fetchTrendingProducts(1);
      if (res) {
        setShowSearchData(true);
      }
    } else {
      setShowSearchData(false);
    }
  };

  const fetchTrendingProducts = async page => {
    if (loadingMore) return;
    setLoadingMore(true);
    setLoading(true);

    const url = `https://real-time-amazon-data.p.rapidapi.com/search?query=${searchText}&page=${page}&country=${country}`;
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': constants.rapid_API_KEY,
        'X-RapidAPI-Host': 'real-time-amazon-data.p.rapidapi.com',
      },
    };
    try {
      const response = await fetch(url, options);
      const result = await response.json();
      if (!!result && result?.data?.products?.length > 0) {
        // setProducts(result?.data?.products);
        console.log('hello: ', result?.data?.products?.length);
        if (page > 1) {
          setProducts(prevProducts => [
            ...prevProducts,
            ...result?.data?.products,
          ]);
        } else {
          setProducts(result?.data?.products);
        }
        setHasMore(true);
      } else {
        setHasMore(false);
      }
      setLoading(false);
      setLoadingMore(false);
      console.log('page no is: ', page);
      return true;
    } catch (error) {
      setLoading(false);
      setLoadingMore(false);
      console.log(error);
    }
  };

  return (
    <>
      <ScreenComponent style={{backgroundColor: colors.white_light2}}>
        <TopHomeScreenCompo />
        {/* <ScrollView
          showsVerticalScrollIndicator={false}
          style={{flex: 1}}
          scrollToOverflowEnabled={false}
          onMomentumScrollEnd={() => {
            if (searchText !== '' && showSearchData) {
              setPage(prevPage => prevPage + 1);
              // fetchTrendingProducts(page + 1);
            }
          }}> */}
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
              onPressClear={() => {
                setSearchText('');
                setProducts([]);
                setShowSearchData(false);
              }}
              placeholder="Search any Product.."
              placeholderTextColor={colors.gray}
              leftIcon={require('../assets/search.png')}
              leftIconStyle={styles.inputLeftIcon}
              onPress={handleOnPressSearch}
              loading={loading}
            />
            <HomeFilterCompo />
          </View>
          {showSearchData ? (
            <HomeSearchDataCompo
              searchText={searchText}
              loading={loading}
              setLoading={setLoading}
              setSearchText={setSearchText}
              showSearchData={showSearchData}
              products={products}
              setProducts={setProducts}
              loadingMore={loadingMore}
              setLoadingMore={setLoadingMore}
              page={page}
              setPage={setPage}
              hasMore={hasMore}
              setHasMore={setHasMore}
              fetchTrendingProducts={fetchTrendingProducts}
            />
          ) : (
            <ScrollView
              style={{flex: 1, marginTop: 8}}
              showsVerticalScrollIndicator={false}>
              <View>
                <ProductCategoryCompo />
                <HomeBannerCompo />
                <DayOfTheDealCompo />
                <ShowAllProductsCompo />
                <SpecialOfferCompo />
                <HeelCompo />
                <TredingProductsBannerCompo />
                <HotSummerSaleCompo />
                <SponseredCompo />
              </View>
            </ScrollView>
          )}
          <View style={{marginVertical: 32}} />
        </View>
        {/* </ScrollView> */}
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
