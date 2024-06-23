import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Alert, TouchableOpacity } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import { useTheme } from './Theme';
import LocationHandler from './LocationHandler';

import Geolocation from '@react-native-community/geolocation';
import { MAP_API_KEY } from '../utils/constants';
import { getUserLocation } from '../utils/helper';
import { fetchHotels } from '../utils/api';
import ContainerWrapper from './ContainerWrapper';


const MapScreen = ({ navigation, route }) => {

  const [currentLocation, setCurrentLocation] = useState(null);
  const { isDarkTheme, colors } = useTheme();
  const [hotels, setHotels] = useState([]);

  useEffect(() => {
    // Update current location from the LocationHandler
    fetchHotelsHandler()
    
  }, []);


  const  onLocationUpdate = (location)=>{
    if(location){
        // setCurrentLocation(location)
        // console.log(location)
    }
  }

  const fetchHotelsHandler = async() => {

    getUserLocation(async(position)=>{
        
      const { latitude, longitude } = position;
      setCurrentLocation({
        latitude,
        longitude,
        latitudeDelta: 0.4,
        longitudeDelta: 0.4,
        

      })
      const data = await fetchHotels(latitude, longitude);
      if(data){
        const filteredHotels = data.results.filter(result => result.types.includes('lodging') || result.types.includes('hotel'));
        setHotels(filteredHotels);
      }

    }, (error)=>{
      console.log(error)
    });
  };

  console.log(currentLocation,"<-->")


  return (
    
    <ContainerWrapper>
      <LocationHandler onLocationUpdate={onLocationUpdate} /> 
      {currentLocation?.latitude ? (
        <>
          <MapView
            style={StyleSheet.absoluteFillObject}
            provider={PROVIDER_GOOGLE}
            region={currentLocation}
          >
            
            <Marker coordinate={currentLocation} title='My Location' pinColor='green'  />
            
            {hotels.map((hotel, index) => (
              <Marker
                key={index}
                coordinate={{
                  latitude: hotel.geometry.location.lat,
                  longitude: hotel.geometry.location.lng,
                }}
                title={hotel.name}
              />
            ))}
          </MapView>
        </>
      ) : (
        <View style={styles.loading}>
          <Text>Loading...</Text> 
        </View>
      )}
    </ContainerWrapper>
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

export default MapScreen;
