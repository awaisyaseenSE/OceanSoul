import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  FlatList,
  Dimensions,
  Image,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import colors from '../styles/colors';
import FastImage from 'react-native-fast-image';
import {height} from 'deprecated-react-native-prop-types/DeprecatedImagePropType';
import fontFamily from '../styles/fontFamily';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const ShowAllProductsCompo = () => {
  const [loading, setLoading] = useState(false);
  const [allProducts, setAllProducts] = useState([]);

  const getAllProducts = async () => {
    try {
      let url = 'https://fakestoreapi.com/products?limit=5';
      setLoading(true);
      let response = await fetch(url);

      if (!response.ok) {
        setLoading(false);
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      let responseData = await response.json();
      if (responseData?.length > 0 && !!responseData) {
        // console.log(responseData?.length);
        setAllProducts(responseData);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log('Error in getting all products data: ', error);
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);

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
                ? require('../assets/full-star.png')
                : require('../assets/half-star.png')
            }
            style={{width: 14, height: 14, marginRight: 2}}
          />
        ))}
      </View>
    );
  };

  const renderItem = ({item, index}) => {
    let fullStars = Math.floor(item?.rating?.rate);

    const randomValue = Math.floor(Math.random() * (200 - 10 + 1)) + 10;
    const finalPrice = item?.price + randomValue;
    let originalPriceValue = finalPrice + 10;
    const savedPercentage =
      ((originalPriceValue - finalPrice) / originalPriceValue) * 100;
    return (
      <TouchableOpacity style={styles.container} activeOpacity={0.6}>
        <FastImage
          source={{
            uri: item?.image
              ? item?.image
              : 'https://cdn.pixabay.com/photo/2020/09/13/14/24/coffee-5568374_1280.jpg',
          }}
          style={styles.image}
        />
        <View style={styles.contentContainer}>
          <Text numberOfLines={1} style={styles.heading}>
            {item?.title}
          </Text>
          <Text numberOfLines={3} style={styles.heading1}>
            {item?.description}
          </Text>
          <Text numberOfLines={1} style={styles.price}>
            ${item?.price}
          </Text>
          <View style={styles.row}>
            <Text style={styles.originalPrice}>
              {originalPriceValue.toFixed(2)}
            </Text>
            <Text style={styles.originalPrice1} numberOfLines={1}>
              {`${savedPercentage.toFixed(2)}%`}
            </Text>
          </View>
          <RatingStars rating={fullStars} />
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <>
      {loading && (
        <View style={{marginTop: 12}}>
          <ActivityIndicator size={'large'} color={colors.red} />
        </View>
      )}
      {allProducts.length > 0 && (
        <View>
          <FlatList
            data={allProducts}
            renderItem={renderItem}
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item, index) => index.toString()}
            horizontal
            ListFooterComponent={<View style={{marginHorizontal: 10}} />}
          />
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    width: screenWidth / 2 - 20,
    marginLeft: 12,
    borderWidth: 1,
    borderColor: colors.gray_light,
    backgroundColor: colors.white,
    paddingBottom: 10,
    borderRadius: 4,
  },
  image: {
    width: screenWidth / 2 - 20,
    height: screenHeight / 5,
    backgroundColor: colors.gray,
    borderRadius: 6,
  },
  contentContainer: {
    paddingHorizontal: 8,
  },
  heading: {
    fontSize: 14,
    fontFamily: fontFamily.medium,
    color: colors.black,
    marginTop: 8,
    marginBottom: 10,
  },
  heading1: {
    fontSize: 12,
    fontFamily: fontFamily.regular,
    color: colors.black,
    marginBottom: 8,
  },
  price: {
    fontSize: 14,
    fontFamily: fontFamily.semi_bold,
    color: colors.black,
  },
  originalPrice: {
    fontSize: 14,
    fontFamily: fontFamily.medium,
    color: colors.gray,
    textDecorationLine: 'line-through',
  },
  originalPrice1: {
    fontSize: 12,
    fontFamily: fontFamily.medium,
    color: colors.red,
    textDecorationLine: 'none',
    marginLeft: 12,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
    overflow: 'hidden',
    marginBottom: 4,
  },
});

export default ShowAllProductsCompo;
