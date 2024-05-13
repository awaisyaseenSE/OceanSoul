import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import colors from '../styles/colors';
import fontFamily from '../styles/fontFamily';

const DayOfTheDealCompo = () => {
  const [remainingTime, setRemainingTime] = useState(calculateRemainingTime());
  function calculateRemainingTime() {
    // const targetTime = new Date('2024-05-14T22:55:20').getTime()
    let targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 1); // Setting target date to tomorrow
    targetDate.setHours(22);
    targetDate.setMinutes(55);
    targetDate.setSeconds(20);

    const targetTime = targetDate.getTime();
    const currentTime = new Date().getTime();
    const timeDifference = targetTime - currentTime;

    const hours = Math.floor(
      (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
    )
      .toString()
      .padStart(2, '0');
    const minutes = Math.floor(
      (timeDifference % (1000 * 60 * 60)) / (1000 * 60),
    )
      .toString()
      .padStart(2, '0');
    const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000)
      .toString()
      .padStart(2, '0');

    return {hours, minutes, seconds};
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setRemainingTime(calculateRemainingTime());
    }, 1000);

    // Cleanup function to clear interval when component unmounts
    return () => clearInterval(timer);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.mainConatiner}>
        <View style={{width: '60%'}}>
          <Text style={styles.heading}>Deal of the Day</Text>
          <View style={styles.row}>
            <Image
              source={require('../assets/clock.png')}
              style={styles.icon}
            />
            <Text
              style={
                styles.heading1
              }>{`${remainingTime.hours}h ${remainingTime.minutes}m ${remainingTime.seconds}s remaining`}</Text>
          </View>
        </View>
        <View style={styles.secondRow}>
          <TouchableOpacity style={styles.btn} activeOpacity={0.8}>
            <Text style={styles.txt2}>View all</Text>
            <Image
              source={require('../assets/right-arrow.png')}
              style={styles.icon1}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 12,
  },
  mainConatiner: {
    backgroundColor: colors.blue,
    width: '90%',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  heading: {
    fontSize: 16,
    color: colors.white,
    fontFamily: fontFamily.semi_bold,
  },
  heading1: {
    fontSize: 14,
    color: colors.white,
    fontFamily: fontFamily.medium,
  },
  icon: {
    width: 18,
    height: 18,
    resizeMode: 'contain',
    marginRight: 4,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  secondRow: {
    width: '40%',
    alignItems: 'flex-end',
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
  icon1: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
    tintColor: colors.white,
    marginLeft: 8,
  },
});

export default DayOfTheDealCompo;
