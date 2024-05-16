import {
  View,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
  Text,
} from 'react-native';
import React, {useState} from 'react';
import ScreenComponent from '../../components/ScreenComponent';
import colors from '../../styles/colors';
import ProfileTopCompo from '../../components/ProfileTopCompo';
import TextInputWithLeftIconCompo from '../../components/TextInputWithLeftIconCompo';
import ButtonComponent from '../../components/ButtonComponent';
import fontFamily from '../../styles/fontFamily';
import {validateEmail, validatePhoneNumber} from '../../helper/validation';

export default function ProfileScreen() {
  const [name, setName] = useState('Muhammad Awais');
  const [email, setEmail] = useState('awaisyaseen.se@gmail.com');
  const [phone, setPhone] = useState('923085449343');

  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [phoneError, setPhoneError] = useState('');

  const handleOnSavePress = () => {
    try {
      let phoneValidate = true;
      if (name === '') {
        setNameError('Name is requried!');
      } else {
        setNameError('');
      }

      if (email === '') {
        setEmailError('Email is required!');
      } else {
        if (!validateEmail(email)) {
          setEmailError('Email is invalid!');
        } else {
          setEmailError('');
        }
      }

      if (phone.length > 0) {
        if (!validatePhoneNumber(phone)) {
          setPhoneError('Phone is invalid!');
          phoneValidate = false;
        } else {
          setPhoneError('');
          phoneValidate = true;
        }
      }

      if (validateEmail(email) && name.length > 0 && phoneValidate) {
        Alert.alert('ok');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <ScreenComponent>
        <TouchableWithoutFeedback style={{flex: 1}} onPress={Keyboard.dismiss}>
          <View style={styles.container}>
            <ProfileTopCompo title="Profile" />
            <View style={styles.topContainer}>
              <Image
                source={require('../../assets/wave.png')}
                style={styles.image}
              />
              <View style={{marginTop: -80}}>
                <Image
                  source={{
                    uri: 'https://cdn.pixabay.com/photo/2017/03/27/13/28/man-2178721_1280.jpg',
                  }}
                  style={styles.userImg}
                />
                <View style={styles.cameraIconContainer}>
                  <Image
                    source={require('../../assets/camera.png')}
                    style={styles.cameraIcon}
                  />
                </View>
              </View>
            </View>
            <KeyboardAvoidingView
              behavior={Platform.OS === 'ios' ? 'padding' : null}
              enabled
              keyboardVerticalOffset={Platform.OS === 'ios' ? 10 : 0}>
              <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{marginTop: 40}}>
                  <TextInputWithLeftIconCompo
                    inputStyle={{
                      ...styles.input,
                      borderColor: nameError !== '' ? colors.red : colors.gray2,
                      marginBottom: nameError !== '' ? 4 : 14,
                    }}
                    value={name}
                    onChangeText={text => {
                      if (text.trim().length) {
                        setName(text);
                        setNameError('');
                      } else {
                        setName('');
                      }
                    }}
                    maxLength={40}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    clearIcon={name.length > 0 ? 'Clear' : ''}
                    onPressClear={() => setName('')}
                    placeholder={'Your Name'}
                    placeholderTextColor="gray"
                  />
                  {nameError !== '' && (
                    <Text style={styles.error}>{emailError}</Text>
                  )}
                  <TextInputWithLeftIconCompo
                    inputStyle={{
                      ...styles.input,
                      borderColor:
                        emailError !== '' ? colors.red : colors.gray2,
                      marginBottom: emailError !== '' ? 4 : 14,
                    }}
                    value={email}
                    onChangeText={text => {
                      if (text.trim().length) {
                        setEmail(text);
                        if (validateEmail(text)) {
                          setEmailError('');
                        }
                      } else {
                        setEmail('');
                      }
                    }}
                    maxLength={40}
                    placeholder={'Your Email Address'}
                    placeholderTextColor="gray"
                  />
                  {emailError !== '' && (
                    <Text style={styles.error}>{emailError}</Text>
                  )}
                  <TextInputWithLeftIconCompo
                    inputStyle={{
                      ...styles.input,
                      borderColor:
                        phoneError !== '' ? colors.red : colors.gray2,
                      marginBottom: phoneError !== '' ? 4 : 14,
                    }}
                    value={phone}
                    onChangeText={text => {
                      if (text.trim().length) {
                        setPhone(text);
                        if (validatePhoneNumber(text)) {
                          setPhoneError('');
                        }
                      } else {
                        setPhone('');
                      }
                    }}
                    maxLength={40}
                    placeholder={'Your Phone'}
                    placeholderTextColor="gray"
                  />
                  {emailError !== '' && (
                    <Text style={styles.error}>{emailError}</Text>
                  )}
                </View>
              </ScrollView>
            </KeyboardAvoidingView>
            <View style={{flex: 1, justifyContent: 'flex-end'}}>
              <ButtonComponent
                style={styles.btn}
                title="Save"
                textStyle={styles.btnTxt}
                onPress={handleOnSavePress}
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </ScreenComponent>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 12,
  },
  image: {
    width: '100%',
    height: 110,
    alignSelf: 'center',
    transform: [{rotate: '-6deg'}],
    borderRadius: 2,
  },
  topContainer: {
    alignItems: 'center',
  },
  userImg: {
    width: 100,
    height: 100,
    borderRadius: 12,
    borderWidth: 3.2,
    borderColor: colors.gray_dark,
  },
  input: {
    backgroundColor: '#EDEBEE',
    borderWidth: 1,
    borderColor: colors.gray2,
  },
  btn: {
    backgroundColor: colors.red_dark2,
    borderRadius: 22,
    height: 50,
  },
  btnTxt: {
    fontFamily: fontFamily.semi_bold,
  },
  cameraIconContainer: {
    width: 26,
    height: 26,
    backgroundColor: colors.red_dark2,
    borderRadius: 13,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 4,
    right: -6,
  },
  cameraIcon: {
    width: 14,
    height: 14,
    tintColor: colors.white,
  },
  error: {
    fontSize: 12,
    fontFamily: fontFamily.semi_bold,
    color: colors.red_dark2,
    marginBottom: 14,
    paddingHorizontal: 4,
  },
});
