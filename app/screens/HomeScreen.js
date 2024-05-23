import {View, StyleSheet, Dimensions, ScrollView, Text} from 'react-native';
import React, {useState, useMemo} from 'react';
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
import SortedByCompoModal from './searchComponents/SortedByCompoModal';
import FilterHomeCompoModal from './searchComponents/FilterHomeCompoModal';
import {useNavigation} from '@react-navigation/native';
import navigationStrings from '../navigation/navigationStrings';

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
  const [sortedBy, setSortedBy] = useState('');
  const [showSortedByModal, setShowSortedByModal] = useState(false);
  const [showFilterModal, setShowFilterModal] = useState(false);

  const [minPrice, setMinPrice] = useState(1);
  const [maxPrice, setMaxPrice] = useState(5000);
  const [productCondition, setProductCondition] = useState('NEW');
  const [category, setCategory] = useState('aps');
  const navigation = useNavigation();

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

    const url = `https://real-time-amazon-data.p.rapidapi.com/search?query=${searchText}&page=${page}&country=${country}&category_id=${category}&sort_by=${sortedBy}&min_price=${minPrice}&max_price=${maxPrice}&product_condition=${productCondition}`;
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': process.env.RAPID_API_KEY,
        'X-RapidAPI-Host': 'real-time-amazon-data.p.rapidapi.com',
      },
    };
    try {
      const response = await fetch(url, options);
      const result = await response.json();

      if (!!result && result?.data?.products?.length > 0) {
        console.log('Total Products: ', result?.data?.products?.length);
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
        <TopHomeScreenCompo
          onPressLeft={() => navigation.openDrawer()}
          onPressRight={() =>
            navigation.navigate(navigationStrings.ProfileScreen)
          }
        />
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
            <HomeFilterCompo
              onPressSort={() => setShowSortedByModal(true)}
              onPressFilter={() => setShowFilterModal(true)}
            />
          </View>
          {showSearchData ? (
            <HomeSearchDataCompo
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
            // <SearchDataComponent />
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
      </ScreenComponent>

      {showSortedByModal && (
        <SortedByCompoModal
          show={showSortedByModal}
          setShow={setShowSortedByModal}
          sortedBy={sortedBy}
          setSortedBy={setSortedBy}
        />
      )}
      {showFilterModal && (
        <FilterHomeCompoModal
          show={showFilterModal}
          setShow={setShowFilterModal}
          minPrice={minPrice}
          setMinPrice={setMinPrice}
          maxPrice={maxPrice}
          setMaxPrice={setMaxPrice}
          productCondition={productCondition}
          setProductCondition={setProductCondition}
          country={country}
          setCountry={setCountry}
          handleOnPressSearch={handleOnPressSearch}
          category={category}
          setCategory={setCategory}
        />
      )}
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
