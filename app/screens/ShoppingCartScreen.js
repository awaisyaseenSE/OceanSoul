import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  Button,
  LogBox,
} from 'react-native';
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
import ButtonComponent from '../components/ButtonComponent';
import {useNavigation} from '@react-navigation/native';
import navigationStrings from '../navigation/navigationStrings';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

export default function ShoppingCartScreen() {
  const mapRef = useRef(null);
  const navigation = useNavigation();

  const [longLat, setLongLat] = useState({
    latitude: 24.806183284627817,
    longitude: 67.05834424320712,
  });

  const CustomMarker = ({img = null, width = 32, height = 32}) => {
    if (img == null) {
      img = require('../assets/location.png');
    }
    return (
      <Image
        source={img}
        style={{width: width, height: height, tintColor: colors.green}}
        resizeMode="contain"
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
    // latitude: 28.3126576248407,
    // longitude: 70.1264309884104,
    latitude: 35.32561799768895,
    longitude: 75.54336378013954,
  };

  const [pickerVal, setPickerVal] = useState({
    origin: {latitude: 24.80939634617301, longitude: 67.03728320440523},
    destination: {
      latitude: 25.1313229,
      longitude: 62.3249865,
    },
  });

  const handlePickLocation = () => {
    navigation.navigate(navigationStrings.PickLocationScreen, {
      setLocationsFun: getValues,
    });
  };

  const getValues = values => {
    if (
      Object.entries(values?.destination).length === 0 &&
      Object.entries(values?.origin).length === 0
    ) {
      console.log('not values');
      return null;
    }
    console.log('Hello every one this is awais! and values is: ', values);
    setPickerVal(values);
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
                width: '100%',
                height: 300,
                alignSelf: 'center',
                flexDirection: 'row',
                paddingHorizontal: 12,
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
                    height: 48,
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
              <ButtonComponent
                title="Pick Location"
                onPress={() => handlePickLocation()}
                style={styles.btn}
                textStyle={styles.btnText}
              />
            </View>
            <MapView
              ref={mapRef}
              provider={PROVIDER_GOOGLE}
              style={styles.map}
              region={{
                latitude: longLat.latitude,
                longitude: longLat.longitude,
                latitudeDelta: 60,
                longitudeDelta: 60,
              }}
              zoomEnabled={true}
              scrollEnabled={true}
              zoomTapEnabled={true}
              zoomControlEnabled={true}
              scrollDuringRotateOrZoomEnabled={true}
              showsMyLocationButton={true}>
              {/* <Marker
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
              </Marker> */}
              {/* <Circle
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
              /> */}
              <Marker coordinate={pickerVal.origin}>
                <CustomMarker
                  img={require('../assets/start-location.png')}
                  width={22}
                  height={22}
                />
              </Marker>

              <Marker coordinate={pickerVal.destination}>
                <CustomMarker />
              </Marker>

              <MapViewDirections
                origin={pickerVal.origin}
                destination={pickerVal.destination}
                apikey={constants.google_Map_API_KEY}
                strokeWidth={3}
                strokeColor="red"
                onStart={() => console.log('statiing...')}
                optimizeWaypoints={true}
                onReady={result => {
                  mapRef.current.fitToCoordinates(result.coordinates, {
                    edgePadding: {
                      right: screenWidth / 20,
                      bottom: screenHeight / 20,
                      left: screenWidth / 20,
                      top: screenHeight / 20,
                    },
                  });
                }}
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
    marginBottom: 50,
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
    // ...StyleSheet.absoluteFillObject,
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  icon: {
    width: 22,
    height: 22,
  },
  btn: {
    width: '20%',
    borderRadius: 6,
    height: 44,
    marginBottom: 12,
    marginLeft: 8,
    backgroundColor: colors.gray2,
    borderWidth: 1,
    borderColor: colors.grayBg,
  },
  btnText: {
    fontSize: 12,
    fontFamily: fontFamily.medium,
    color: colors.black_light,
  },
});
