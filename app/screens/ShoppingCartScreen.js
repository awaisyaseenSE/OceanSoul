import {View, Text, StyleSheet, Dimensions, Image} from 'react-native';
import React, {useRef, useState} from 'react';
import ScreenComponent from '../components/ScreenComponent';
import colors from '../styles/colors';
import FastImage from 'react-native-fast-image';
import fontFamily from '../styles/fontFamily';
import MapView, {
  Callout,
  Circle,
  Marker,
  PROVIDER_GOOGLE,
  Polyline,
} from 'react-native-maps';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import constants from '../constants/constants';
import MapViewDirections from 'react-native-maps-directions';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

export default function ShoppingCartScreen() {
  const mapRef = useRef(null);

  const [longLat, setLongLat] = useState({
    latitude: 24.806183284627817,
    longitude: 67.05834424320712,
  });

  const CustomMarker = () => {
    return (
      <Image
        source={require('../assets/location.png')}
        style={{width: 44, height: 44}}
      />
    );
  };
  const CustomMarkerTitle = () => {
    return (
      <View>
        <Text>Hello everone this is from pakistan city karachi</Text>
      </View>
    );
  };

  const moveToLocation = (lati, longi) => {
    mapRef?.current?.animateToRegion(
      {
        latitude: lati,
        longitude: longi,
        latitudeDelta: 0.015,
        longitudeDelta: 0.0121,
      },
      2000,
    );
  };

  const origin = {latitude: 24.80939634617301, longitude: 67.03728320440523};
  const destination = {
    latitude: 24.808402999137794,
    longitude: 67.03923585252838,
  };

  return (
    <>
      <ScreenComponent style={{backgroundColor: colors.white_light2}}>
        <View style={styles.mainContainer}>
          {/* <Text style={styles.heading}>Google Map</Text> */}

          <View style={styles.container}>
            <View
              style={{
                position: 'absolute',
                top: 10,
                zIndex: 1,
                width: '94%',
                height: 300,
                alignSelf: 'center',
                // backgroundColor: colors.grayBg,
              }}>
              <GooglePlacesAutocomplete
                placeholder="Search Places..."
                onPress={(data, details = null) => {
                  let finalData = JSON.stringify(details?.geometry?.location);
                  moveToLocation(
                    details?.geometry?.location?.lat,
                    details?.geometry?.location?.lng,
                  );
                }}
                query={{
                  key: constants.google_Map_API_KEY,
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
            </View>
            <MapView
              ref={mapRef}
              provider={PROVIDER_GOOGLE}
              style={styles.map}
              region={{
                latitude: longLat.latitude,
                longitude: longLat.longitude,
                latitudeDelta: 40,
                longitudeDelta: 40,
              }}>
              <Marker
                draggable
                coordinate={{
                  latitude: longLat.latitude,
                  longitude: longLat.longitude,
                }}
                // title="Hello this is tokyo japan"
                // description="My name is awais"
                onDragEnd={e => setLongLat(e.nativeEvent.coordinate)}>
                <CustomMarker />
                <Callout
                  style={{width: 300, height: 40, backgroundColor: 'white'}}>
                  <CustomMarkerTitle />
                </Callout>
              </Marker>
              <Circle
                center={{
                  latitude: longLat.latitude,
                  longitude: longLat.longitude,
                }}
                radius={1300}
                fillColor={colors.gray_light}
                strokeColor={colors.gray}
              />
              <Polyline
                coordinates={[
                  {
                    latitude: 24.81187786847102,
                    longitude: 67.03384534442155,
                  },
                  {
                    latitude: longLat.latitude,
                    longitude: longLat.longitude,
                  },
                ]}
                strokeColor={colors.red_dark}
                strokeWidth={2}
              />
              <MapViewDirections
                origin={origin}
                destination={destination}
                apikey={constants.google_Map_API_KEY}
              />
            </MapView>
          </View>
        </View>
      </ScreenComponent>
    </>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  heading: {
    fontSize: 16,
    fontFamily: fontFamily.semi_bold,
    color: colors.black,
    textAlign: 'center',

    position: 'absolute',
    zIndex: 1,
    top: 0,
    width: '100%',
    backgroundColor: '#FFFFFF33',
    paddingVertical: 6,
  },
  container: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
