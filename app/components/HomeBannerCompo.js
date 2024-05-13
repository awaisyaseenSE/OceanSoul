import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Dimensions,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, {useState} from 'react';
import colors from '../styles/colors';
import fontFamily from '../styles/fontFamily';
import FastImage from 'react-native-fast-image';
import {homeBannerData} from '../helper/ProductsData';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const HomeBannerCompo = () => {
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(1);
  const renderItem = ({item, index}) => {
    return (
      <View style={styles.mainContainer}>
        <FastImage source={{uri: item?.img}} style={styles.image} />
        <View
          style={[
            styles.contentContainer,
            {
              alignItems: item.left ? 'flex-start' : 'flex-end',
              left: item?.left ? 34 : 0,
              right: item?.left ? 0 : 34,
            },
          ]}>
          <Text style={styles.txt}>{item?.title}</Text>
          <Text style={styles.txt1}>{item?.desc}</Text>
          <TouchableOpacity style={styles.btn} activeOpacity={0.6}>
            <Text style={styles.txt2}>Shop Now</Text>
            <Image
              source={require('../assets/right-arrow.png')}
              style={styles.icon}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={homeBannerData}
        renderItem={renderItem}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
        horizontal
        pagingEnabled
        onMomentumScrollEnd={ev => {
          setCurrentPhotoIndex(
            Math.round(ev.nativeEvent.contentOffset.x / screenWidth) + 1,
          );
        }}
      />
      <View style={{alignItems: 'center', marginTop: 8}}>
        {homeBannerData.length > 1 && (
          <FlatList
            data={homeBannerData}
            renderItem={({item, index}) => (
              <View
                style={{
                  width: 8,
                  height: 8,
                  backgroundColor:
                    currentPhotoIndex === index + 1
                      ? colors.pink
                      : colors.gray2,
                  borderRadius: 4,
                  marginRight: 4,
                }}
              />
            )}
            keyExtractor={(item, index) => index.toString()}
            numColumns={10}
            scrollEnabled={false}
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  mainContainer: {
    width: screenWidth,
    alignItems: 'center',
  },
  image: {
    width: screenWidth - 30,
    height: screenHeight / 3.8,
    borderRadius: 12,
  },
  txt: {
    fontSize: 20,
    fontFamily: fontFamily.semi_bold,
    color: colors.white,
  },
  txt1: {
    fontSize: 14,
    fontFamily: fontFamily.medium,
    color: colors.white,
    marginVertical: 8,
  },
  contentContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  btn: {
    borderWidth: 1,
    borderColor: colors.white,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  txt2: {
    fontSize: 14,
    fontFamily: fontFamily.semi_bold,
    color: colors.white,
  },
  icon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
    tintColor: colors.white,
    marginLeft: 8,
  },
});

export default HomeBannerCompo;
