import React, { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet, RefreshControl, Alert, Linking, TextInput, Button as RNButton } from 'react-native';
import { Avatar, Card, Text, Appbar, Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Feather from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';
import Geolocation from '@react-native-community/geolocation';

const API_KEY = 'sAIzaSyCJagPVMH9H_zJjUOFvL_dR84gGjEIk1t8';

const LeftContent = props => <Avatar.Icon {...props} icon="map" />;

const ListScreen = () => {
  const navigation = useNavigation();
  const [refreshing, setRefreshing] = useState(false);
  const [hotels, setHotels] = useState([]);
  const [theme, setTheme] = useState("light");

  const fetchHotels = async (latitude, longitude) => {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=10000&type=lodging&keyword=hotel&key=${API_KEY}`
      );
      const data = await response.json();
      console.log("Response from Google Places API:", data);
      if (data.status === 'OK') {
        const filteredHotels = data.results.filter(result => result.types.includes('lodging') || result.types.includes('hotel'));
        setHotels(filteredHotels);
      } else {
        console.error('Error fetching hotels:', data.status);
        Alert.alert('Error', 'Failed to fetch hotels. Please try again later.');
      }
    } catch (error) {
      console.error('Error fetching hotels:', error);
      Alert.alert('Error', 'Failed to fetch hotels. Please check your network connection.');
    }
  };

  const getCurrentLocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords;
        fetchHotels(latitude, longitude);
      },
      error => {
        console.error('Error getting location:', error);
        Alert.alert('Error', 'Failed to get current location. Please enable location services.');
      },
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  };

  useEffect(() => {
    getCurrentLocation();
    getTheme();
  }, []);

  const getTheme = async () => {
    try {
      const value = await AsyncStorage.getItem('theme');
      if (value !== null) {
        setTheme(value);
      }
    } catch (e) {
      console.error('Error reading theme from AsyncStorage:', e);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    getCurrentLocation();
    setRefreshing(false);
  };

  const navigateToMap = () => {
    navigation.navigate('Map', { hotels }); 
  };

  return (
    <View style={styles.container}>
      <Appbar.Header style={{ backgroundColor: theme === 'light' ? '#FFFFFF' : '#000000' }}>
        <Appbar.Content title="Hotels Near You" />
      </Appbar.Header>
      <FlatList
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        data={hotels}
        renderItem={({ item }) => (
          <Card style={{ backgroundColor: theme === 'light' ? '#FFFFFF' : '#000000' }}>
            <Card.Title
              title={<Text style={{ color: theme === 'light' ? '#000000' : '#FFFFFF' }}>{item.name}</Text>}
              subtitle={<Text style={{ color: theme === 'light' ? '#000000' : '#FFFFFF' }}>{item.vicinity}</Text>}
              left={LeftContent}
            />
            <Card.Cover source={{ uri: item.photos ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${item.photos[0].photo_reference}&key=${API_KEY}` : 'https://via.placeholder.com/150' }} />
            <Card.Actions>
              
              <Button onPress={() => navigation.navigate('Marker', { lat: item.geometry.location.lat, long: item.geometry.location.lng, desc: item.name, address: item.vicinity })}>
                <Feather name="map-pin" size={30} color="blue" />
              </Button>
              <Button onPress={() => Linking.openURL(`https://www.google.com/maps/dir/?api=1&destination=${item.geometry.location.lat},${item.geometry.location.lng}`)}>
                <Entypo name="direction" size={30} color="#422040" />
              </Button>
            </Card.Actions>
          </Card>
        )}
        keyExtractor={item => item.place_id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50
  },
});

export default ListScreen;
