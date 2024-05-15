import {View, Text, FlatList, TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';
import {category} from '../helper/ProductsData';
import FastImage from 'react-native-fast-image';
import colors from '../styles/colors';
import fontFamily from '../styles/fontFamily';
import {useNavigation} from '@react-navigation/native';
import navigationStrings from '../navigation/navigationStrings';

const ProductCategoryCompo = () => {
  const navigation = useNavigation();
  const handleOnPress = name => {
    navigation.navigate(navigationStrings.NewArrivalProductsScreen, {
      name: name,
      title: `${name} Collection`,
    });
  };
  const renderItem = ({item, index}) => {
    return (
      <TouchableOpacity
        style={[
          styles.container,
          {
            marginLeft: index === 0 ? 20 : 16,
          },
        ]}
        activeOpacity={0.6}
        onPress={() => handleOnPress(item?.name)}>
        <FastImage
          source={{
            uri: item?.img
              ? item?.img
              : 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cHJvZHVjdHN8ZW58MHx8MHx8fDA%3D',
          }}
          style={styles.image}
        />
        <Text style={styles.txt}>{item.name}</Text>
      </TouchableOpacity>
    );
  };
  return (
    <View style={styles.mainContainer}>
      <FlatList
        data={category}
        renderItem={renderItem}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
        horizontal
        ListFooterComponent={<View style={{marginHorizontal: 10}} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginLeft: 12,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.gray_dark,
  },
  txt: {
    fontSize: 12,
    fontFamily: fontFamily.medium,
    color: colors.black,
    marginTop: 4,
  },
  mainContainer: {
    marginTop: 20,
    marginBottom: 14,
    backgroundColor: colors.white,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: colors.gray_light,
    shadowColor: colors.gray_dark,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
});

export default ProductCategoryCompo;
