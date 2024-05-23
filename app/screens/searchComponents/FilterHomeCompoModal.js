import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Modal,
  StyleSheet,
  Dimensions,
  Platform,
  FlatList,
} from 'react-native';
import React, {useState} from 'react';
import colors from '../../styles/colors';
import fontFamily from '../../styles/fontFamily';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import ButtonComponent from '../../components/ButtonComponent';
import FastImage from 'react-native-fast-image';
import {amazonCategories, category} from '../../helper/ProductsData';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

const FilterHomeCompoModal = ({
  show,
  setShow,
  minPrice,
  setMinPrice,
  maxPrice,
  setMaxPrice,
  productCondition,
  setProductCondition,
  country,
  setCountry,
  handleOnPressSearch,
  category,
  setCategory,
}) => {
  const insets = useSafeAreaInsets();
  const product_conditionArr = ['NEW', 'USED', 'RENEWED', 'COLLECTIBLE'];
  const [isCountryShow, setIsCountryShow] = useState(false);
  const [isCategoryShow, setIsCategoryShow] = useState(false);

  let countryData = [
    {
      id: 'US',
      name: 'United States',
      img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/de/Flag_of_the_United_States.png/1200px-Flag_of_the_United_States.png',
    },
    {
      id: 'AU',
      name: 'Australia',
      img: 'https://upload.wikimedia.org/wikipedia/en/thumb/b/b9/Flag_of_Australia.svg/1280px-Flag_of_Australia.svg.png',
    },
    {
      id: 'BR',
      name: 'Brazil',
      img: 'https://upload.wikimedia.org/wikipedia/en/thumb/0/05/Flag_of_Brazil.svg/2560px-Flag_of_Brazil.svg.png',
    },
    {
      id: 'CA',
      name: 'Canada',
      img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Flag_of_Canada.png/1200px-Flag_of_Canada.png',
    },
    {
      id: 'CN',
      name: 'China',
      img: 'https://upload.wikimedia.org/wikipedia/commons/2/2e/Flag_of_China.png',
    },
    {
      id: 'FR',
      name: 'France',
      img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/62/Flag_of_France.png/1280px-Flag_of_France.png',
    },
    {
      id: 'DE',
      name: 'Germany',
      img: 'https://upload.wikimedia.org/wikipedia/commons/3/3d/Flag_of_germany_800_480.png',
    },
    {
      id: 'IN',
      name: 'India',
      img: 'https://upload.wikimedia.org/wikipedia/commons/b/bc/Flag_of_India.png',
    },
    {
      id: 'IT',
      name: 'Itlay',
      img: 'https://upload.wikimedia.org/wikipedia/commons/e/e4/Flag_of_Italy_%281946%E2%80%932003%29.png',
    },
    {
      id: 'MX',
      name: 'Mexico',
      img: 'https://upload.wikimedia.org/wikipedia/commons/1/17/Flag_of_Mexico.png',
    },
    {
      id: 'NL',
      name: 'Netherlands',
      img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Flag_of_the_Netherlands.png/800px-Flag_of_the_Netherlands.png',
    },
    {
      id: 'SG',
      name: 'Singapore',
      img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/Flag_of_Singapore.svg/2560px-Flag_of_Singapore.svg.png',
    },
    {
      id: 'ES',
      name: 'Spain',
      img: 'https://upload.wikimedia.org/wikipedia/commons/6/6f/Spain_flag_300.png',
    },
    {
      id: 'TR',
      name: 'Turkey',
      img: 'https://upload.wikimedia.org/wikipedia/commons/8/87/Flag_of_Turkey.png',
    },
    {
      id: 'AE',
      name: 'United Arab Emirates (UAE)',
      img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Flag_of_the_United_Arab_Emirates.svg/2560px-Flag_of_the_United_Arab_Emirates.svg.png',
    },
    {
      id: 'GB',
      name: 'United Kingdom',
      img: 'https://upload.wikimedia.org/wikipedia/commons/4/42/Flag_of_the_United_Kingdom.png',
    },
    {
      id: 'JP',
      name: 'Japan',
      img: 'https://upload.wikimedia.org/wikipedia/commons/3/37/Japan_Flag.png',
    },
    {
      id: 'SA',
      name: 'South Africa',
      img: 'https://www.countryflags.com/wp-content/uploads/south-africa-flag-png-xl.png',
    },
    {
      id: 'PL',
      name: 'Poland',
      img: 'https://upload.wikimedia.org/wikipedia/commons/a/aa/Poland_flag_300.png',
    },
    {
      id: 'SE',
      name: 'Serbia',
      img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/94/Flag_of_Serbia.png/1200px-Flag_of_Serbia.png',
    },
    {
      id: 'BE',
      name: 'Belgium',
      img: 'https://upload.wikimedia.org/wikipedia/commons/e/eb/Flag_of_Belgium.png',
    },
    {
      id: 'EG',
      name: 'Egypt',
      img: 'https://upload.wikimedia.org/wikipedia/commons/1/10/Egypt_flag_300.png',
    },
  ];

  const renderItem = ({item, index}) => {
    return (
      <TouchableOpacity
        style={styles.row}
        activeOpacity={0.6}
        onPress={() => setCountry(item?.id)}>
        <Text
          style={[
            styles.txt1,
            {
              color: item?.id === country ? colors.red_dark2 : colors.black,
            },
          ]}>
          {item?.name}
        </Text>
        <FastImage
          source={{uri: item?.img}}
          style={styles.img}
          resizeMode="contain"
        />
      </TouchableOpacity>
    );
  };

  const renderItemCategoy = ({item, index}) => {
    let isEven = index % 2 == 0 ? true : false;
    return (
      <TouchableOpacity
        style={[
          styles.categoryCotainer,
          {
            marginLeft: isEven ? 0 : 4,
            marginRight: isEven ? 4 : 0,
          },
        ]}
        onPress={() => setCategory(item?.id)}
        activeOpacity={0.8}>
        <View style={styles.circle}>
          <View
            style={item?.id === category ? styles.fillRadio : styles.radio}
          />
        </View>
        <Text
          style={[
            styles.txt1,
            {
              marginLeft: 6,
              fontFamily:
                item?.id === category
                  ? fontFamily.semi_bold
                  : fontFamily.medium,
            },
          ]}
          numberOfLines={2}>
          {item?.name}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <Modal visible={show} transparent animationType="slide">
      <View
        style={{
          backgroundColor: 'rgba(0,0,0,0.5)',
          flex: 1,
        }}>
        <TouchableOpacity
          style={{flex: 1}}
          activeOpacity={1}
          onPress={() => setShow(false)}
        />
        <View
          style={[
            styles.modalView,
            {
              paddingBottom: Platform.OS === 'ios' ? insets.bottom : 20,
            },
          ]}>
          <View style={{marginVertical: 6}} />
          <View style={styles.row}>
            <TouchableOpacity
              style={styles.modalCloseIconContainer}
              onPress={() => setShow(false)}>
              <Image
                source={require('../../assets/back.png')}
                style={styles.icon}
              />
            </TouchableOpacity>
            <Text style={styles.modalText}>Filter by</Text>
            <View
              style={{
                paddingHorizontal: 6,
                paddingVertical: 6,
              }}>
              <View style={styles.icon} />
            </View>
          </View>
          <View style={styles.line} />
          <View style={styles.container}>
            <View style={{flex: 1, paddingHorizontal: 16}}>
              <TouchableOpacity
                style={styles.row}
                activeOpacity={0.6}
                onPress={() => {
                  setIsCountryShow(!isCountryShow);
                  setIsCategoryShow(false);
                }}>
                <Text
                  style={[
                    styles.heading,
                    {
                      marginBottom: 0,
                    },
                  ]}>
                  Country
                </Text>

                <Image
                  source={
                    isCountryShow
                      ? require('../../assets/upward-arrow.png')
                      : require('../../assets/down.png')
                  }
                  style={styles.icon2}
                />
              </TouchableOpacity>
              {isCountryShow && (
                <FlatList
                  data={countryData}
                  renderItem={renderItem}
                  keyExtractor={(item, index) => index.toString()}
                  showsVerticalScrollIndicator={false}
                />
              )}
              <TouchableOpacity
                style={styles.row}
                activeOpacity={0.6}
                onPress={() => {
                  setIsCategoryShow(!isCategoryShow);
                  setIsCountryShow(false);
                }}>
                <Text
                  style={[
                    styles.heading,
                    {
                      marginBottom: 0,
                    },
                  ]}>
                  Category
                </Text>

                <Image
                  source={
                    isCategoryShow
                      ? require('../../assets/upward-arrow.png')
                      : require('../../assets/down.png')
                  }
                  style={styles.icon2}
                />
              </TouchableOpacity>
              {isCategoryShow && (
                <FlatList
                  data={amazonCategories}
                  renderItem={renderItemCategoy}
                  keyExtractor={(item, index) => index.toString()}
                  showsVerticalScrollIndicator={false}
                  numColumns={2}
                />
              )}
            </View>
            <View style={{paddingHorizontal: 12}}>
              <Text style={styles.heading}>Product Condition</Text>
              <View style={[styles.flexWrap, {marginBottom: 12}]}>
                {product_conditionArr.map((item, index) => (
                  <TouchableOpacity
                    key={index}
                    style={[
                      styles.typeContainer,
                      {
                        backgroundColor:
                          item === productCondition
                            ? colors.gray
                            : colors.gray2,
                      },
                    ]}
                    activeOpacity={0.7}
                    onPress={() => setProductCondition(item)}>
                    <Text
                      style={[
                        styles.txt,
                        {
                          color:
                            item === productCondition
                              ? colors.black_light
                              : colors.black,
                        },
                      ]}>
                      {item}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
            <View style={styles.line} />
            <View style={{paddingHorizontal: 12, marginTop: 16}}>
              <Text style={styles.heading}>Price</Text>
              <Text style={styles.txt}>
                {minPrice} - {maxPrice}
              </Text>
              <MultiSlider
                values={[minPrice, maxPrice]}
                step={10}
                min={1}
                max={5000}
                isMarkersSeparated={true}
                onValuesChange={values => {
                  setMinPrice(values[0]);
                  setMaxPrice(values[1]);
                }}
                selectedStyle={{backgroundColor: colors.red_dark2}}
                sliderLength={screenWidth - 50}
                customMarkerLeft={() => {
                  return <View style={styles.marker2} />;
                }}
                customMarkerRight={() => {
                  return <View style={styles.marker} />;
                }}
              />
              <ButtonComponent
                title="Apply"
                style={styles.btn}
                textStyle={styles.btntxt}
                onPress={() => {
                  setShow(false);
                  handleOnPressSearch();
                }}
              />
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalView: {
    width: '100%',
    height: screenHeight / 1.3,
    backgroundColor: colors.gray2,
    borderRadius: 12,
    alignSelf: 'center',
    paddingHorizontal: 10,
  },
  radio: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  fillRadio: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.red,
  },
  modalText: {
    fontSize: 16,
    color: colors.black,
    fontFamily: fontFamily.semi_bold,
  },
  modalCloseIconContainer: {
    paddingHorizontal: 6,
    paddingVertical: 6,
  },
  modalCloseIcon: {
    width: 12,
    height: 12,
    resizeMode: 'contain',
    tintColor: 'gray',
  },
  row: {
    marginTop: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'red',
  },
  icon: {
    width: 18,
    height: 18,
    resizeMode: 'contain',
    tintColor: colors.black,
  },
  line: {
    marginTop: 10,
    height: 1,
    backgroundColor: colors.gray,
    marginHorizontal: 8,
  },
  container: {
    flex: 1,

    marginTop: 10,
    marginBottom: 8,
    justifyContent: 'flex-end',
  },
  row1: {
    marginBottom: 4,
    paddingVertical: 4,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingRight: 20,
  },
  circle: {
    width: 10,
    height: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.black,
  },
  marker: {
    backgroundColor: colors.red_dark2,
    height: 20,
    width: 20,
    borderRadius: 10,
  },
  marker2: {
    height: 20,
    width: 20,
    borderRadius: 10,

    backgroundColor: colors.red_dark2,
  },
  txt: {
    fontSize: 14,
    fontFamily: fontFamily.medium,
    color: colors.black,
    paddingHorizontal: 4,
  },
  heading: {
    fontSize: 18,
    fontFamily: fontFamily.semi_bold,
    color: colors.black,
    marginBottom: 8,
  },
  btn: {
    backgroundColor: colors.red_dark2,
    width: '60%',
    alignSelf: 'center',
    borderRadius: 22,
  },
  btntxt: {
    color: colors.gray_light,
    fontSize: 15,
  },
  flexWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  typeContainer: {
    borderWidth: 1,
    borderColor: colors.gray,
    borderRadius: 8,
    borderCurve: 'continuous',
    paddingHorizontal: 14,
    paddingVertical: 4,
  },
  img: {
    width: 44,
    height: 30,
    borderRadius: 4,
  },
  txt1: {
    fontSize: 14,
    fontFamily: fontFamily.medium,
    color: colors.black,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
    paddingHorizontal: 6,
  },
  icon2: {
    width: 20,
    height: 20,
    tintColor: colors.black,
  },
  categoryCotainer: {
    marginBottom: 4,
    flex: 1,
    paddingHorizontal: 8,
    paddingVertical: 4,
    flexDirection: 'row',
    alignItems: 'center',
  },
  radio: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  fillRadio: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.red,
  },
  circle: {
    width: 10,
    height: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.black,
  },
});

export default FilterHomeCompoModal;
