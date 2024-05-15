import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Dimensions,
  TouchableOpacity,
  Linking,
  Image,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import ScreenComponent from '../../components/ScreenComponent';
import FastImage from 'react-native-fast-image';
import colors from '../../styles/colors';
import fontFamily from '../../styles/fontFamily';
import TopCompoWithHeading from '../../components/TopCompoWithHeading';
import constants from '../../constants/constants';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

export default function NewArrivalProductsScreen({route}) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const productName = route?.params?.name ? route?.params?.name : 'summer';
  const title = route?.params?.title
    ? route?.params?.title
    : 'Summer Collection';
  const [country, setCountry] = useState('US');

  const [loadingMore, setLoadingMore] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    fetchTrendingProducts(page);
  }, [page]);

  const fetchTrendingProducts = async () => {
    if (loadingMore) return;
    setLoadingMore(true);
    setLoading(true);

    const url = `https://real-time-amazon-data.p.rapidapi.com/search?query=${productName}&page=${page}&country=${country}`;
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
        setProducts(prevProducts => [
          ...prevProducts,
          ...result?.data?.products,
        ]);
        setHasMore(true);
      } else {
        setHasMore(false);
      }
      setLoading(false);
      setLoadingMore(false);
    } catch (error) {
      setLoading(false);
      setLoadingMore(false);
      console.log(error);
    }
  };

  const handleOpenUrl = async url => {
    try {
      let isOpen = await Linking.canOpenURL(url);
      if (isOpen) {
        await Linking.openURL(url);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const RatingStars = ({rating}) => {
    const stars = [];

    // Add full stars
    for (let i = 0; i < rating; i++) {
      stars.push('fill');
    }

    // Add empty stars
    for (let i = rating; i < 5; i++) {
      stars.push('empty');
    }

    return (
      <View style={{flexDirection: 'row'}}>
        {stars.map((star, index) => (
          <Image
            key={index}
            source={
              star === 'fill'
                ? require('../../assets/full-star.png')
                : require('../../assets/half-star.png')
            }
            style={{width: 14, height: 14, marginRight: 2}}
          />
        ))}
      </View>
    );
  };

  const renderItem = ({item, index}) => {
    let isEven = index % 2 == 0 ? true : false;
    let fullStars = Math.floor(item?.product_star_rating);

    return (
      <TouchableOpacity
        style={[
          styles.mainContainer,
          {
            marginLeft: isEven ? 0 : 4,
            marginRight: isEven ? 4 : 0,
          },
        ]}
        onPress={() => handleOpenUrl(item?.product_url)}
        activeOpacity={0.6}>
        <FastImage source={{uri: item?.product_photo}} style={styles.img} />
        <View style={styles.contentContainer}>
          <Text numberOfLines={2} style={styles.heading}>
            {item?.product_title}
          </Text>
          <Text numberOfLines={2} style={styles.heading2}>
            Price:{' '}
            <Text style={{color: colors.green}}>{item?.product_price}</Text>
          </Text>
          <Text
            numberOfLines={2}
            style={[
              styles.heading2,
              {
                marginVertical: 0,
              },
            ]}>
            Sales Volume:{' '}
            <Text style={{color: colors.gray_dark}}>{item?.sales_volume}</Text>
          </Text>
          <View style={[styles.row, {overflow: 'hidden', marginTop: 6}]}>
            <RatingStars rating={fullStars} />
            <Text style={styles.txt}>{item?.product_star_rating}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <>
      <ScreenComponent>
        <View style={styles.container}>
          <TopCompoWithHeading title={title} style={{paddingHorizontal: 0}} />
          <FlatList
            data={products}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
            showsVerticalScrollIndicator={false}
            numColumns={2}
            ItemSeparatorComponent={<View style={{marginVertical: 6}} />}
            onEndReached={() => {
              if (hasMore && !loadingMore) {
                setPage(prevPage => prevPage + 1);
              }
            }}
            onEndReachedThreshold={0.5}
            ListFooterComponent={
              loadingMore && hasMore ? (
                <ActivityIndicator size="large" color={colors.gray_dark} />
              ) : null
            }
          />
        </View>
      </ScreenComponent>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 14,
  },
  img: {
    width: '100%',
    height: screenHeight / 4,
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
    backgroundColor: colors.gray_light,
  },
  mainContainer: {
    width: screenWidth / 2 - 20,
    backgroundColor: colors.white,
    borderRadius: 6,
    borderWidth: 1.5,
    borderColor: colors.gray_light,
  },
  contentContainer: {
    paddingBottom: 22,
    paddingHorizontal: 10,
    paddingTop: 12,
  },
  heading: {
    fontSize: 16,
    fontFamily: fontFamily.medium,
    color: colors.black,
  },
  heading2: {
    fontSize: 12,
    fontFamily: fontFamily.medium,
    color: colors.black_light,
    marginVertical: 6,
    textTransform: 'capitalize',
  },
  subHeading: {
    fontSize: 12,
    color: colors.black,
    fontFamily: fontFamily.regular,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  txt: {
    fontSize: 12,
    fontFamily: fontFamily.medium,
    color: colors.black_light,
    marginLeft: 8,
  },
});
