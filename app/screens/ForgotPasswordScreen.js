import {View, Text, StyleSheet, TouchableOpacity, Alert} from 'react-native';
import React, {useState} from 'react';
import ScreenComponent from '../components/ScreenComponent';
import fontFamily from '../styles/fontFamily';
import colors from '../styles/colors';
import TextInputWithLeftIconCompo from '../components/TextInputWithLeftIconCompo';
import ButtonComponent from '../components/ButtonComponent';
import {validateEmail} from '../helper/validation';

export default function ForgotPasswordScreen() {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');

  const handleForgotPassword = () => {
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
      if (validateEmail(email)) {
        Alert.alert('Ok');
      }
    } catch (error) {
      console.log('Error while Forgot Password: ', error);
    }
  };

  return (
    <ScreenComponent>
      <View style={styles.container}>
        <Text style={styles.heading}>Forgot{'\n'}Password?</Text>
        <TextInputWithLeftIconCompo
          leftIcon={require('../assets/email.png')}
          value={email}
          onChangeText={text => {
            if (text.trim().length) {
              setEmail(text);
            } else {
              setEmail('');
            }
          }}
          maxLength={320}
          placeholder="Enter your email address"
          placeholderTextColor={colors.gray_dark}
          inputStyle={{
            marginBottom: emailError !== '' ? '2%' : '8%',

            borderColor: emailError !== '' ? colors.red : colors.gray_dark,
          }}
          keyboardType="email-address"
        />
        {emailError !== '' && (
          <Text style={styles.errorText}>{emailError}</Text>
        )}
        <Text style={styles.forgotTxt}>
          <Text style={{color: colors.red}}>* </Text>We will send you a message
          to set or reset your new password
        </Text>
        <ButtonComponent
          title="Submit"
          style={{marginTop: '12%'}}
          onPress={handleForgotPassword}
        />
      </View>
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
  errorText: {
    fontSize: 12,
    fontFamily: fontFamily.medium,
    color: colors.red,
    marginBottom: '8%',
    paddingLeft: 4,
  },
});
