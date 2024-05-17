import {Platform, StyleSheet, useWindowDimensions} from 'react-native';
import React from 'react';
import Animated, {interpolate, useAnimatedStyle} from 'react-native-reanimated';
import {useDrawerProgress} from '@react-navigation/drawer';
import colors from '../styles/colors';

const DrawerView = ({children}) => {
  const progress = useDrawerProgress();
  const {width} = useWindowDimensions();
  const animatedStyle = useAnimatedStyle(() => {
    const borderRadius = interpolate(progress.value, [0, 1], [0, 20], 'clamp');
    const shadowRadius = interpolate(progress.value, [0, 1], [0, 20], 'clamp');
    const shadowOpacity = interpolate(
      progress.value,
      [0, 1],
      [0.5, 0],
      'clamp',
    );
    const shadowOffsetY = interpolate(progress.value, [0, 1], [0, 4], 'clamp');

    return {
      transform: [
        {perspective: 1000},
        {
          scale: interpolate(progress.value, [0, 1], [1, 0.85], 'clamp'),
        },
        {
          translateX: interpolate(
            progress.value,
            [0, 1],
            [
              0,
              Platform.OS === 'android' ? width - width * 0.21 : width * 0.01,
            ],
            'clamp',
          ),
        },
      ],
      borderRadius,
      overflow: 'hidden',
      shadowColor: colors.dark,
      shadowOpacity,
      shadowRadius,
      elevation: 10,
      ...(Platform.OS === 'ios' && {
        shadowOffset: {width: 0, height: shadowOffsetY},
      }),
    };
  });

  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      {children}
    </Animated.View>
  );
};
export default DrawerView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
