import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Alert, TouchableOpacity } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import { useTheme } from './Theme';
import LocationHandler from './LocationHandler';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';

const MapScreen = ({ navigation, route }) => {
  const [currentLocation, setCurrentLocation] = useState(null);
  const { isDarkTheme, toggleTheme } = useTheme();

  useEffect(() => {
    // Update current location from the LocationHandler
    if (route.params?.location) {
      setCurrentLocation(route.params.location);
    }
  }, [route.params?.location]);

  return (
    <View style={isDarkTheme ? darkStyles.container : styles.container}>
      <LocationHandler /> 
      {currentLocation ? (
        <>
          <MapView
            style={StyleSheet.absoluteFillObject}
            provider={PROVIDER_GOOGLE}
            initialRegion={currentLocation}
          >
            
            <Marker coordinate={currentLocation} />
            
            {route.params?.hotels.map((hotel, index) => (
              <Marker
                key={index}
                coordinate={{
                  latitude: hotel.geometry.location.lat,
                  longitude: hotel.geometry.location.lng,
                }}
                title={hotel.name}
                description={`Price Level: ${hotel.price_level || 'N/A'}`}
                onPress={() =>
                  Alert.alert(
                    hotel.name,
                    `Price Level: ${hotel.price_level || 'N/A'}`,
                  )
                }
              />
            ))}
          </MapView>
          <View style={styles.toggleButtonContainer}>
            <TouchableOpacity onPress={toggleTheme}>
              {isDarkTheme ? (
                <MaterialIcons name="dark-mode" size={24} color="white" />
              ) : (
                <Feather name="sun" size={24} color="black" />
              )}
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <View style={styles.loading}>
          <Text>Loading...</Text> 
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  toggleButtonContainer: {
    position: 'absolute',
    top: 20,
    right: 20,
  },
});

const darkStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#000',
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  toggleButtonContainer: {
    position: 'absolute',
    top: 20,
    right: 20,
  },
});

export default MapScreen;
