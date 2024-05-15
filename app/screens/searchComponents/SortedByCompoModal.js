import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Modal,
  StyleSheet,
  Dimensions,
  FlatList,
} from 'react-native';
import React from 'react';
import colors from '../../styles/colors';
import fontFamily from '../../styles/fontFamily';
import ScreenComponent from '../../components/ScreenComponent';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const SortedByCompoModal = ({show, setShow, setSortedBy, sortedBy}) => {
  const data = [
    {
      id: 'RELEVANCE',
      title: 'RELEVANCE',
    },
    {
      id: 'LOWEST_PRICE',
      title: 'LOWEST PRICE',
    },
    {
      id: 'HIGHEST_PRICE',
      title: 'HIGHEST PRICE',
    },
    {
      id: 'REVIEWS',
      title: 'REVIEWS',
    },
    {
      id: 'NEWEST',
      title: 'NEWEST',
    },
    {
      id: 'BEST_SELLERS',
      title: 'BEST SELLERS',
    },
  ];

  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        style={styles.row1}
        activeOpacity={0.6}
        onPress={() => {
          setSortedBy(item?.id);
        }}>
        <Text>{item?.title}</Text>
        <View style={styles.circle}>
          <View
            style={item?.id === sortedBy ? styles.fillRadio : styles.radio}
          />
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <Modal visible={show} transparent animationType="slide">
      <ScreenComponent style={{backgroundColor: 'rgba(0, 0, 0, 0.5)'}}>
        <TouchableOpacity
          style={{flex: 1}}
          activeOpacity={1}
          onPress={() => setShow(false)}
        />
        <View style={styles.modalView}>
          <View style={styles.row}>
            <TouchableOpacity
              style={styles.modalCloseIconContainer}
              onPress={() => setShow(false)}>
              <Image
                source={require('../../assets/back.png')}
                style={styles.icon}
              />
            </TouchableOpacity>
            <Text style={styles.modalText}>Sorted by</Text>
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
            <FlatList
              data={data}
              renderItem={renderItem}
              showsVerticalScrollIndicator={false}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
        </View>
        <TouchableOpacity
          style={{flex: 1}}
          activeOpacity={1}
          onPress={() => setShow(false)}
        />
      </ScreenComponent>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalView: {
    width: '95%',
    height: screenHeight / 4,
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
    paddingHorizontal: 12,
    marginTop: 10,
    marginBottom: 8,
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
});

export default SortedByCompoModal;
