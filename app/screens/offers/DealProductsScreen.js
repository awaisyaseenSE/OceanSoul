import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Dimensions,
  TouchableOpacity,
  Linking,
  Alert,
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

export default function DealProductsScreen() {
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const getAllDealProducts = async () => {
    try {
      const options = {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': constants.rapid_API_KEY,
          'X-RapidAPI-Host': 'real-time-amazon-data.p.rapidapi.com',
        },
      };
      let url = 'https://real-time-amazon-data.p.rapidapi.com/deals?country=US';
      setLoading(true);
      let response = await fetch(url, options);

      if (!response.ok) {
        setLoading(false);
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      let responseData = await response.json();
      if (responseData?.data?.deals?.length > 0 && !!responseData) {
        setAllProducts(responseData?.data?.deals);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log('Error in getting all products data: ', error);
    }
  };

  useEffect(() => {
    getAllDealProducts();
  }, []);

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

  const renderItem = ({item, index}) => {
    let isEven = index % 2 == 0 ? true : false;
    const dateStart = new Date(item?.deal_starts_at);
    let finalStartDate = dateStart.toLocaleDateString();

    return (
      <TouchableOpacity
        style={[
          styles.mainContainer,
          {
            marginLeft: isEven ? 0 : 4,
            marginRight: isEven ? 4 : 0,
          },
        ]}
        onPress={() => handleOpenUrl(item?.deal_url)}
        activeOpacity={0.6}>
        <FastImage source={{uri: item?.deal_photo}} style={styles.img} />
        <View style={styles.contentContainer}>
          <Text numberOfLines={2} style={styles.heading}>
            {item?.deal_title}
          </Text>
          <Text numberOfLines={2} style={styles.heading2}>
            Status:{' '}
            <Text style={{color: colors.green}}>{item?.deal_state}</Text>
          </Text>
          <Text>${item?.savings_amount?.amount}</Text>
          <View style={styles.row}>
            <Text
              style={[
                styles.subHeading,
                {
                  textDecorationLine: 'line-through',
                },
              ]}>
              ${item?.list_price?.amount}
            </Text>
            <Text
              style={[
                styles.subHeading,
                {
                  color: colors.red,
                  marginLeft: 12,
                },
              ]}>
              ${item?.deal_badge}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <>
      <ScreenComponent>
        <View style={styles.container}>
          <TopCompoWithHeading
            title="All Deals"
            style={{paddingHorizontal: 0}}
          />
          {loading ? (
            <View style={{marginTop: 14}}>
              <ActivityIndicator size={'large'} color={colors.gray_dark} />
            </View>
          ) : (
            <FlatList
              data={allProducts}
              renderItem={renderItem}
              keyExtractor={(item, index) => index.toString()}
              showsVerticalScrollIndicator={false}
              numColumns={2}
              ItemSeparatorComponent={<View style={{marginVertical: 6}} />}
            />
          )}
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
});
