import { Alert, Button, StyleSheet, Text, View, Image } from 'react-native'
import React, {useEffect, useState} from 'react'
import * as Location from 'expo-location';
import { Dimensions } from 'react-native';
import { getOneDocument, updateDB } from '../firebase/firestoreHelper';
import { auth } from '../firebase/firebaseSetup';
import { useNavigation, useRoute } from '@react-navigation/native';

const windowWidth = Dimensions.get('window').width;

export default function LocationManager() {
  const navigation = useNavigation();
  const route = useRoute();
  const [location, setLocation] = useState(null);
  const [response, requestPermission] = Location.useForegroundPermissions();

  Location.useForegroundPermissions();

  useEffect(() => {
    async function getUserData() {
      const userData = await getOneDocument(auth.currentUser.uid, 'users');
      if (userData && userData.location) {
        setLocation(userData.location);
      }
    }
    getUserData();
  }, []);
  
  useEffect(() => {
    if (route.params) {
      setLocation(route.params.selectedLocation);
    }
  }, [route]);

  function saveLocationHandler() {
    updateDB(auth.currentUser.uid, { location }, 'users');
    navigation.navigate('Home');
  }

  async function verifyPermissions() {
    try {
      if (response.granted) {
        return true;
      }
      const permissionResponse = await requestPermission();
      return permissionResponse.granted;
    } catch (error) {
      console.log(error);
    }
  }

  async function locateUserHandler() {
    try {
      const hasPermission = await verifyPermissions();
      if (!hasPermission) {
        Alert.alert("You need to give location permissions.");
        return;
      }
      const locationResponse = await Location.getCurrentPositionAsync();
      console.log(locationResponse);
      setLocation({
        latitude: locationResponse.coords.latitude,
        longitude: locationResponse.coords.longitude
      });
    } catch (error) {
      console.log('locate user' + error);
    }
  }

  function chooseLocationHandler() {
    navigation.navigate('Map');
  }

  return (
    <View>
      <Button title="Locate Me" onPress={locateUserHandler} />
      <Button title="Let me choose on the map" onPress={chooseLocationHandler} />
      {location && (
        <Image
          source={{
            uri: `https://maps.googleapis.com/maps/api/staticmap?center=${location.latitude},${location.longitude}&zoom=14&size=400x200&maptype=roadmap&markers=color:red%7Clabel:L%7C${location.latitude},${location.longitude}&key=${process.env.EXPO_PUBLIC_mapsApiKey}`,
          }}
          style={styles.image}
        />
      )}
      <Button
        disabled={!location}
        title="Save My Location"
        onPress={saveLocationHandler}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  image: {
    width: windowWidth,
    height: 200,
  }
})