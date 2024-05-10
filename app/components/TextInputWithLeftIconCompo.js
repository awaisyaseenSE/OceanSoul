import React from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import colors from '../styles/colors';
import fontFamily from '../styles/fontFamily';

const TextInputWithLeftIconCompo = ({
  value = '',
  onChangeText,
  placeholder = '',
  secureTextEntry = false,
  onPressSecure = () => {},
  secureText = '',
  inputStyle = {},
  textStyle = {},
  placeholderTextColor = colors.grey,
  clearIcon = '',
  onPressClear = () => {},
  closeIconStyle,
  leftIcon,
  leftIconStyle,
  onPress,
  loading = false,
  ...props
}) => {
  return (
    <View style={{...styles.inputStyle, ...inputStyle}}>
      {leftIcon && (
        <TouchableOpacity
          style={{
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={onPress}
          activeOpacity={0.6}>
          <Image
            source={leftIcon}
            style={{...styles.leftIcon, ...leftIconStyle}}
          />
        </TouchableOpacity>
      )}
      <TextInput
        style={{...styles.textStyle, ...textStyle}}
        value={value}
        placeholder={placeholder}
        onChangeText={onChangeText}
        placeholderTextColor={placeholderTextColor}
        secureTextEntry={secureTextEntry}
        onPressSecure={onPressSecure}
        {...props}
      />
      {!!secureText ? (
        <TouchableOpacity onPress={onPressSecure} activeOpacity={0.6}>
          <Image source={secureText} style={styles.showHideIcon} />
        </TouchableOpacity>
      ) : null}
      {clearIcon.length > 0 ? (
        <TouchableOpacity
          onPress={onPressClear}
          style={{
            paddingVertical: 6,
            // backgroundColor: 'pink',
            paddingHorizontal: 4,
          }}
          disabled={loading}>
          {loading ? (
            <ActivityIndicator size={'small'} color={colors.LightWhite} />
          ) : (
            <Image
              source={require('../assets/close.png')}
              style={{...styles.closeIcon, ...closeIconStyle}}
            />
          )}
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  inputStyle: {
    height: 50,
    justifyContent: 'space-between',
    borderRadius: 8,
    paddingHorizontal: 16,
    alignItems: 'center',
    marginBottom: 14,
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: colors.gray,
    backgroundColor: colors.gray_light,
  },
  textStyle: {
    fontSize: 14,
    fontFamily: fontFamily.rubik_medium,
    flex: 1,
    color: colors.LightWhite,
    marginRight: 12,
    height: '100%',
  },
  showHideIcon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
    tintColor: colors.gray_dark,
  },
  closeIcon: {
    width: 12,
    height: 12,
    resizeMode: 'contain',
    tintColor: colors.gray_dark,
  },
  leftIcon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
    tintColor: colors.gray_dark,
    marginRight: 12,
  },
});

export default TextInputWithLeftIconCompo;
