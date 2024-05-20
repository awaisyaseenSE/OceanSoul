import {View, Text, StyleSheet, Dimensions, Image} from 'react-native';
import React, {useState} from 'react';
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

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

export default function ShoppingCartScreen() {
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

  return (
    <>
      <ScreenComponent style={{backgroundColor: colors.white_light2}}>
        <View style={styles.mainContainer}>
          <Text style={styles.heading}>Google Map</Text>
          <View style={styles.container}>
            <MapView
              provider={PROVIDER_GOOGLE} // remove if not using Google Maps
              style={styles.map}
              region={{
                latitude: 24.8607,
                longitude: 67.0011,
                latitudeDelta: 0.2,
                longitudeDelta: 0.2,
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
