import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  Button,
  LogBox,
  ScrollView,
} from 'react-native';
import React, {useRef, useState} from 'react';
import ScreenComponent from '../../components/ScreenComponent';
import colors from '../../styles/colors';
import FastImage from 'react-native-fast-image';
import fontFamily from '../../styles/fontFamily';
import {useNavigation} from '@react-navigation/native';
import ButtonComponent from '../../components/ButtonComponent';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import constants from '../../constants/constants';
import TopCompoWithHeading from '../../components/TopCompoWithHeading';

export default function PickLocationScreen({route}) {
  const navigation = useNavigation();
  const setLocationsFun = route?.params?.setLocationsFun;
  const [bothLocation, setBothLocation] = useState({
    origin: {},
    destination: {},
  });

  const {origin, destination} = bothLocation;

  const onDone = () => {
    console.log('locations: ', bothLocation);
    setLocationsFun(bothLocation);
    navigation.goBack();
  };

  const moveToLocationStart = (lat, long) => {
    setBothLocation({
      ...bothLocation,
      origin: {
        latitude: lat,
        longitude: long,
      },
    });
  };
  const moveToLocationDestination = (lat, long) => {
    setBothLocation({
      ...bothLocation,
      destination: {
        latitude: lat,
        longitude: long,
      },
    });
  };
  return (
    <>
      <ScreenComponent>
        <TopCompoWithHeading title="Pick Location" />
        <View style={styles.container}>
          <GooglePlacesAutocomplete
            placeholder="Start Place..."
            onPress={(data, details = null) => {
              console.log('Lattitude: ', details?.geometry?.location?.lat);
              console.log('Longtitude: ', details?.geometry?.location?.lng);
              moveToLocationStart(
                details?.geometry?.location?.lat,
                details?.geometry?.location?.lng,
              );
            }}
            query={{
              key: process.env.GOOGLE_MAP_API_KEY,
              language: 'en',
            }}
            fetchDetails={true}
            styles={{
              textInputContainer: {
                backgroundColor: colors.white_light2,
              },
              textInput: {
                height: 48,
                color: '#5d5d5d',
                fontSize: 16,
                backgroundColor: colors.gray2,
              },
              predefinedPlacesDescription: {
                color: '#1fafef',
              },
            }}
            onFail={error =>
              console.log('error in picking start location: ', error)
            }
          />

          <GooglePlacesAutocomplete
            placeholder="Destination Place..."
            onPress={(data, details = null) => {
              let finalData = JSON.stringify(details?.geometry?.location);
              moveToLocationDestination(
                details?.geometry?.location?.lat,
                details?.geometry?.location?.lng,
              );
            }}
            query={{
              key: process.env.GOOGLE_MAP_API_KEY,
              language: 'en',
            }}
            fetchDetails={true}
            styles={{
              textInputContainer: {
                backgroundColor: colors.white_light2,
              },
              textInput: {
                height: 48,
                color: '#5d5d5d',
                fontSize: 16,
                backgroundColor: colors.gray2,
              },
              predefinedPlacesDescription: {
                color: '#1fafef',
              },
            }}
            onFail={error => console.log(error)}
          />

          {/* <ScrollView
            style={{paddingTop: 14}}
            showsVerticalScrollIndicator={false}
            scrollEnabled={false}>
            <GooglePlacesAutocomplete
              placeholder="Start Place..."
              onPress={(data, details = null) => {
                console.log('Lattitude: ', details?.geometry?.location?.lat);
                console.log('Longtitude: ', details?.geometry?.location?.lng);
                moveToLocationStart(
                  details?.geometry?.location?.lat,
                  details?.geometry?.location?.lng,
                );
              }}
              query={{
                key: process.env.GOOGLE_MAP_API_KEY,
                language: 'en',
              }}
              fetchDetails={true}
              styles={{
                textInputContainer: {
                  backgroundColor: colors.white_light2,
                },
                textInput: {
                  height: 48,
                  color: '#5d5d5d',
                  fontSize: 16,
                  backgroundColor: colors.gray2,
                },
                predefinedPlacesDescription: {
                  color: '#1fafef',
                },
              }}
              onFail={error =>
                console.log('error in picking start location: ', error)
              }
            />

            <View style={{marginVertical: 4}} />

            <GooglePlacesAutocomplete
              placeholder="Destination Place..."
              onPress={(data, details = null) => {
                let finalData = JSON.stringify(details?.geometry?.location);
                moveToLocationDestination(
                  details?.geometry?.location?.lat,
                  details?.geometry?.location?.lng,
                );
              }}
              query={{
                key: process.env.GOOGLE_MAP_API_KEY,
                language: 'en',
              }}
              fetchDetails={true}
              styles={{
                textInputContainer: {
                  backgroundColor: colors.white_light2,
                },
                textInput: {
                  height: 48,
                  color: '#5d5d5d',
                  fontSize: 16,
                  backgroundColor: colors.gray2,
                },
                predefinedPlacesDescription: {
                  color: '#1fafef',
                },
              }}
              onFail={error => console.log(error)}
            />
          </ScrollView> */}

          {/* <View style={{flex: 1, backgroundColor: 'red'}}> */}
          <ButtonComponent textStyle={{}} title="Done" onPress={onDone} />
          {/* </View> */}
        </View>
      </ScreenComponent>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 22,
  },
});
