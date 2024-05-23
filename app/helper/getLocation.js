import React from 'react';
import {Alert, PermissionsAndroid, Platform} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import constants from '../constants/constants';

const requestLocationPermissionIOS = async () => {
  try {
    let res = await Geolocation.requestAuthorization('whenInUse');

    if (res === 'granted') {
      console.log('You can use Geolocation in IOS: ', res);
      return true;
    } else {
      console.log('You cannot use Geolocation in IOS: ', res);
      return false;
    }
  } catch (err) {
    console.log('Error in getting IOS Location permission: ', err);
    return false;
  }
};

const requestLocationPermissionAndroid = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'Geolocation Permission',
        message: 'Can we access your location?',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    console.log('granted', granted);
    if (granted === 'granted') {
      console.log('You can use Geolocation in Android');
      return true;
    } else {
      console.log('You cannot use Geolocation in Android');
      return false;
    }
  } catch (err) {
    console.log('Error in getting Android Location permission: ', err);
    return false;
  }
};

export const getLocation = async () => {
  try {
    let locationPermission = false;
    if (Platform.OS === 'android') {
      locationPermission = await requestLocationPermissionAndroid();
    } else {
      locationPermission = await requestLocationPermissionIOS();
    }
    if (locationPermission) {
      // Alert.alert('Now you have permission here get location!');
      //   Geolocation.getCurrentPosition(
      //     position => {
      //       console.log(position);
      //       //   setLocation(position);
      //     },
      //     error => {
      //       // See error code charts below.
      //       console.log('Error in location: ', error.code, error.message);
      //       //   setLocation(false);
      //     },
      //     {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
      //   );
      return new Promise((resolve, reject) => {
        Geolocation.getCurrentPosition(
          position => {
            resolve(position);
          },
          error => {
            reject(error);
          },
          {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
        );
      });
    } else {
      Alert.alert('You have not give permission to get location!');
    }
  } catch (error) {
    console.log('Error in getting Location: ', error);
  }
};

export const fetchAddressByCoordinates = async (latitude, longitude) => {
  try {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${constants.google_Map_API_KEY}`,
    );

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();

    if (data && data.results && data.results.length > 0) {
      const formattedAddress = data.results[0].formatted_address;
      console.log('address formate: ', formattedAddress);

      const addressComponents = data.results[0].address_components;
      let countryName = null;
      let cityName = null;
      let plotNumber = null;

      addressComponents.forEach(component => {
        if (component.types.includes('country')) {
          countryName = component.long_name;
        } else if (component.types.includes('locality')) {
          cityName = component.long_name;
        } else if (component.types.includes('street_number')) {
          plotNumber = component.long_name;
        } else if (component.types.includes('route')) {
          plotNumber = plotNumber + ' ' + component.long_name;
        }
      });

      console.log('..............');
      console.log('User city name is: ', cityName);
      console.log('User country name is: ', countryName);
      console.log('User address detail is: ', plotNumber);
      console.log('..............');
    }
  } catch (error) {
    console.log('Error fetching address by latitude and longitude: ', error);
  }
};
