import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Modal,
  StyleSheet,
  Dimensions,
  Platform,
} from 'react-native';
import React from 'react';
import colors from '../../styles/colors';
import fontFamily from '../../styles/fontFamily';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const screenHeight = Dimensions.get('window').height;

const FilterHomeCompoModal = ({
  show,
  setShow,
  minPrice,
  setMinPrice,
  maxPrice,
  setMaxPrice,
  productCondition,
  setProductCondition,
}) => {
  const insets = useSafeAreaInsets();

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
          <View style={styles.container}></View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalView: {
    width: '100%',
    height: screenHeight / 1.5,
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

export default FilterHomeCompoModal;
