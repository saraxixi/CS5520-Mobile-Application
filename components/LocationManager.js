import { Alert, Button, StyleSheet, Text, View, Image } from 'react-native'
import React, {useState} from 'react'
import { auth } from '../firebase/firebaseSetup'
import * as Location from 'expo-location';
import { Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;
export default function LocationManager() {
  const [response, requestPermission] = Location.useForegroundPermissions();
  const [location, setLocation] = useState(null);

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
      console.log('locate user handler' + error);
    }
  }

  return (
    <View>
      <Button title="Locate Me" onPress={locateUserHandler} />
      {location && (
        <Image
          source={{
            uri: `https://maps.googleapis.com/maps/api/staticmap?center=${location.latitude},${location.longitude}&zoom=14&size=400x200&maptype=roadmap&markers=color:red%7Clabel:L%7C${location.latitude},${location.longitude}&key=${process.env.EXPO_PUBLIC_mapsApiKey}`,
          }}
          style={styles.image}
        />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  image: {
    width: windowWidth,
    height: 200,
  }
})