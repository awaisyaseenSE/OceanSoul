import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Image,
} from 'react-native';
import React, {useState} from 'react';
import ScreenComponent from '../components/ScreenComponent';
import TopCompoWithHeading from '../components/TopCompoWithHeading';
import FastImage from 'react-native-fast-image';
import constants from '../constants/constants';
import fontFamily from '../styles/fontFamily';
import colors from '../styles/colors';
import TextInputWithLeftIconCompo from '../components/TextInputWithLeftIconCompo';
import {useNavigation} from '@react-navigation/native';
import navigationStrings from '../navigation/navigationStrings';
import ButtonComponent from '../components/ButtonComponent';

export default function CheckoutScreen() {
  const [name, setName] = useState('Muhammad Awais');
  const [email, setEmail] = useState('awaisyaseen.se@gmail.com');
  const [phone, setPhone] = useState('923085449343');
  const navigation = useNavigation();
  const [pinCode, setPinCode] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [country, setCountry] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [accountHolderName, setAccountHolderName] = useState('');
  const [ifscCode, setIfscCode] = useState('');
  return (
    <ScreenComponent>
      <TopCompoWithHeading title="Checkout" />
      <View style={styles.container}>
        <KeyboardAvoidingView
          style={{
            flex: 1,
            width: '100%',
          }}
          behavior={Platform.OS === 'ios' ? 'padding' : null}
          enabled
          keyboardVerticalOffset={Platform.OS === 'ios' ? 10 : 0}>
          <ScrollView style={{flex: 1}} showsVerticalScrollIndicator={false}>
            <View style={styles.profileImageContainer}>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate(navigationStrings.ProfileScreen)
                }>
                <FastImage
                  source={{uri: constants.userProfileImageURl}}
                  style={styles.profileImageStyle}
                />
                <Image
                  source={require('../assets/pen.png')}
                  style={styles.pen}
                />
              </TouchableOpacity>
            </View>
            <View style={{flex: 1}}>
              <Text style={[styles.heading, {marginBottom: 16}]}>
                Personal Details
              </Text>
              <Text style={styles.label}>Email Address</Text>
              <TouchableOpacity
                style={styles.nameContainer}
                activeOpacity={0.9}
                onPress={() =>
                  navigation.navigate(navigationStrings.ProfileScreen)
                }>
                <Text>{name}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.nameContainer}
                activeOpacity={0.9}
                onPress={() =>
                  navigation.navigate(navigationStrings.ProfileScreen)
                }>
                <Text>{email}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.nameContainer}
                activeOpacity={0.9}
                onPress={() =>
                  navigation.navigate(navigationStrings.ProfileScreen)
                }>
                <Text>{phone}</Text>
              </TouchableOpacity>
              <View style={styles.line} />
              <Text style={[styles.heading, {marginBottom: 20}]}>
                Business Address
              </Text>
              <Text style={styles.label}>Postal Code</Text>
              <TextInputWithLeftIconCompo
                inputStyle={styles.inputColor}
                value={pinCode}
                onChangeText={text => {
                  if (text.trim().length) {
                    setPinCode(text);
                  } else {
                    setPinCode('');
                  }
                }}
                maxLength={40}
                placeholder={'Postal Code'}
                placeholderTextColor="gray"
              />
              <Text style={styles.label}>Address</Text>
              <TextInputWithLeftIconCompo
                inputStyle={styles.inputColor}
                value={address}
                onChangeText={text => {
                  if (text.trim().length) {
                    setAddress(text);
                  } else {
                    setAddress('');
                  }
                }}
                maxLength={40}
                placeholder={'Address'}
                placeholderTextColor="gray"
              />
              <Text style={styles.label}>City</Text>
              <TextInputWithLeftIconCompo
                inputStyle={styles.inputColor}
                value={city}
                onChangeText={text => {
                  if (text.trim().length) {
                    setCity(text);
                  } else {
                    setCity('');
                  }
                }}
                maxLength={40}
                placeholder={'City'}
                placeholderTextColor="gray"
              />
              <Text style={styles.label}>State</Text>
              <TextInputWithLeftIconCompo
                inputStyle={styles.inputColor}
                value={state}
                onChangeText={text => {
                  if (text.trim().length) {
                    setState(text);
                  } else {
                    setState('');
                  }
                }}
                maxLength={40}
                placeholder={'State'}
                placeholderTextColor="gray"
              />
              <Text style={styles.label}>Country</Text>
              <TextInputWithLeftIconCompo
                inputStyle={styles.inputColor}
                value={country}
                onChangeText={text => {
                  if (text.trim().length) {
                    setCountry(text);
                  } else {
                    setCountry('');
                  }
                }}
                maxLength={40}
                placeholder={'Country'}
                placeholderTextColor="gray"
              />
              <View style={styles.line} />
              <Text style={[styles.heading, {marginBottom: 20}]}>
                Bank Account Details
              </Text>
              <Text style={styles.label}>Account Number</Text>
              <TextInputWithLeftIconCompo
                inputStyle={styles.inputColor}
                value={accountNumber}
                onChangeText={text => {
                  if (text.trim().length) {
                    setAccountNumber(text);
                  } else {
                    setAccountNumber('');
                  }
                }}
                maxLength={40}
                placeholder={'Account Number'}
                placeholderTextColor="gray"
              />
              <Text style={styles.label}>Account Holder Name</Text>
              <TextInputWithLeftIconCompo
                inputStyle={styles.inputColor}
                value={accountHolderName}
                onChangeText={text => {
                  if (text.trim().length) {
                    setAccountHolderName(text);
                  } else {
                    setAccountHolderName('');
                  }
                }}
                maxLength={40}
                placeholder={'Account Holder Name'}
                placeholderTextColor="gray"
              />
              <Text style={styles.label}>IFSC Code</Text>
              <TextInputWithLeftIconCompo
                inputStyle={styles.inputColor}
                value={ifscCode}
                onChangeText={text => {
                  if (text.trim().length) {
                    setIfscCode(text);
                  } else {
                    setIfscCode('');
                  }
                }}
                maxLength={40}
                placeholder={'IFSC Code'}
                placeholderTextColor="gray"
              />
              <ButtonComponent
                title="Save"
                style={styles.btn}
                textStyle={styles.btnTxt}
              />
              <View
                style={{marginVertical: Platform.OS === 'android' ? 12 : 4}}
              />
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    </ScreenComponent>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  profileImageStyle: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  profileImageContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  heading: {
    fontSize: 16,
    fontFamily: fontFamily.semi_bold,
    color: colors.black,
  },
  label: {
    fontSize: 12,
    fontFamily: fontFamily.regular,
    color: colors.black,
    marginBottom: 14,
  },
  nameContainer: {
    height: 50,
    justifyContent: 'center',
    borderRadius: 8,
    paddingHorizontal: 16,
    marginBottom: 14,

    borderWidth: 1,
    borderColor: colors.gray,
    backgroundColor: colors.gray_light,
  },
  line: {
    width: '100%',
    height: 1,
    backgroundColor: colors.gray2,
    marginBottom: 20,
    marginTop: 10,
  },
  inputColor: {
    backgroundColor: colors.white_light2,
  },
  btn: {
    marginTop: 30,
    borderRadius: 8,
    height: 50,
  },
  btnTxt: {
    fontFamily: fontFamily.semi_bold,
    fontSize: 14,
  },
  pen: {
    width: 24,
    height: 24,
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
});
