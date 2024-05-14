import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import ScreenComponent from '../components/ScreenComponent';
import fontFamily from '../styles/fontFamily';
import colors from '../styles/colors';
import TextInputWithLeftIconCompo from '../components/TextInputWithLeftIconCompo';
import ButtonComponent from '../components/ButtonComponent';
import {validateEmail} from '../helper/validation';
import navigationStrings from '../navigation/navigationStrings';
import {useNavigation} from '@react-navigation/native';

export default function SignUpScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [secureTextEntry1, setSecureTextEntry1] = useState(true);
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isPasswordMatch, setIsPasswordMatch] = useState(true);
  const navigation = useNavigation();

  const handleSignUp = () => {
    if (password === '') {
      setPasswordError('Password is required!');
    } else {
      if (password.length < 6) {
        setPasswordError('Password is not less then 6 characters!');
      } else {
        setPasswordError('');
        if (password === confirmPassword) {
          setIsPasswordMatch(true);
        } else {
          setIsPasswordMatch(false);
        }
      }
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
    try {
      if (
        password.length > 5 &&
        confirmPassword.length > 5 &&
        validateEmail(email) &&
        confirmPassword === password
      ) {
        Alert.alert('Ok');
      }
    } catch (error) {
      console.log('Error while SignUp ', error);
    }
  };

  return (
    <ScreenComponent>
      <KeyboardAvoidingView
        style={{
          flex: 1,
          width: '100%',
        }}
        behavior={Platform.OS === 'ios' ? 'padding' : null}
        enabled
        keyboardVerticalOffset={Platform.OS === 'ios' ? 10 : 0}>
        <ScrollView style={{flex: 1}} showsVerticalScrollIndicator={false}>
          <View style={styles.container}>
            <Text style={styles.heading}>Create{'\n'}an account</Text>
            <TextInputWithLeftIconCompo
              leftIcon={require('../assets/user.png')}
              value={email}
              onChangeText={text => {
                if (text.trim().length) {
                  setEmail(text);
                } else {
                  setEmail('');
                }
              }}
              maxLength={320}
              placeholder="Username or email"
              placeholderTextColor={colors.gray_dark}
              keyboardType="email-address"
              inputStyle={{
                marginBottom: emailError !== '' ? '2%' : '8%',
                borderColor: emailError !== '' ? colors.red : colors.gray_dark,
              }}
            />
            {emailError !== '' && (
              <Text style={styles.errorText}>{emailError}</Text>
            )}
            <TextInputWithLeftIconCompo
              leftIcon={require('../assets/lock.png')}
              value={password}
              onChangeText={text => {
                if (text.trim().length) {
                  setPassword(text);
                } else {
                  setPassword('');
                }
              }}
              maxLength={320}
              placeholder="Password"
              placeholderTextColor={colors.gray_dark}
              inputStyle={{
                marginBottom: passwordError !== '' ? '2%' : '8%',

                borderColor:
                  passwordError !== '' ? colors.red : colors.gray_dark,
              }}
              secureText={
                secureTextEntry
                  ? require('../assets/eye.png')
                  : require('../assets/hide.png')
              }
              secureTextEntry={secureTextEntry}
              onPressSecure={() => setSecureTextEntry(!secureTextEntry)}
            />
            {passwordError !== '' && (
              <Text style={styles.errorText}>{passwordError}</Text>
            )}
            <TextInputWithLeftIconCompo
              leftIcon={require('../assets/lock.png')}
              value={confirmPassword}
              onChangeText={text => {
                if (text.trim().length) {
                  setConfirmPassword(text);
                } else {
                  setConfirmPassword('');
                }
              }}
              maxLength={320}
              placeholder="Confirm Password"
              placeholderTextColor={colors.gray_dark}
              inputStyle={{
                marginBottom: isPasswordMatch ? 14 : '2%',
                borderColor:
                  password !== confirmPassword && password.length > 5
                    ? colors.red
                    : colors.gray_dark,
              }}
              secureText={
                secureTextEntry1
                  ? require('../assets/eye.png')
                  : require('../assets/hide.png')
              }
              secureTextEntry={secureTextEntry1}
              onPressSecure={() => setSecureTextEntry1(!secureTextEntry1)}
            />
            {!isPasswordMatch && (
              <Text style={[styles.errorText, {marginBottom: 18}]}>
                Password is not same!
              </Text>
            )}
            <TouchableOpacity activeOpacity={0.6}>
              <Text style={styles.forgotTxt}>
                By clicking the{' '}
                <Text
                  style={{color: colors.red, fontFamily: fontFamily.medium}}>
                  Register
                </Text>{' '}
                button, you are agree to the public offer
              </Text>
            </TouchableOpacity>
            <ButtonComponent
              title="Create Account"
              style={{marginTop: '12%'}}
              onPress={handleSignUp}
            />
            <View style={styles.bottomStyle}>
              <Text style={styles.lightTxt}>- OR Continue with -</Text>
              <View style={styles.row}>
                <TouchableOpacity
                  style={styles.iconContainer}
                  activeOpacity={0.7}>
                  <Image
                    source={require('../assets/google.png')}
                    style={styles.icon}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.iconContainer, {marginHorizontal: 14}]}
                  activeOpacity={0.7}>
                  <Image
                    source={require('../assets/apple.png')}
                    style={styles.icon}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.iconContainer}
                  activeOpacity={0.7}>
                  <Image
                    source={require('../assets/facebook.png')}
                    style={styles.icon}
                  />
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                style={{
                  paddingHorizontal: 10,
                  paddingVertical: 6,
                }}
                activeOpacity={0.6}
                onPress={() =>
                  navigation.navigate(navigationStrings.LoginScreen)
                }>
                <Text style={styles.createAccountTxt}>
                  I already have an Account{' '}
                  <Text
                    style={{
                      color: colors.red,
                      fontFamily: fontFamily.semi_bold,
                      textDecorationLine: 'underline',
                    }}>
                    Login
                  </Text>
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </ScreenComponent>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 14,
  },
  heading: {
    fontSize: 26,
    fontFamily: fontFamily.bold,
    color: colors.black,
    marginBottom: '8%',
  },
  forgotTxt: {
    fontSize: 12,
    fontFamily: fontFamily.regular,
    color: colors.gray_dark,
  },
  bottomStyle: {
    alignItems: 'center',
    marginTop: '10%',
  },
  lightTxt: {
    fontSize: 12,
    fontFamily: fontFamily.medium,
    color: colors.gray_dark,
  },
  icon: {
    width: 26,
    height: 26,
    resizeMode: 'contain',
  },

  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.pink_light,
    borderWidth: 1,
    borderColor: colors.red,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: '6%',
    marginBottom: '12%',
  },
  createAccountTxt: {
    fontSize: 14,
    fontFamily: fontFamily.medium,
    color: colors.gray_dark,
  },
  errorText: {
    fontSize: 12,
    fontFamily: fontFamily.medium,
    color: colors.red,
    marginBottom: '8%',
    paddingLeft: 4,
  },
});
