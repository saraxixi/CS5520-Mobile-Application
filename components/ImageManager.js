import { Alert, Button, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import * as ImagePicker from 'expo-image-picker';

export default function ImageManager() {
  const [response, requestPermission] = ImagePicker.useCameraPermissions();
  console.log(response);
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

  async function takeImageHandler() {
    try {
      // call verifyPermissions() before launching the camera
      const hasPermission = verifyPermissions();
      if(!hasPermission) {
        Alert.alert("You need to give camera permissions.");
        return;
      }
      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
      });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <View>
      <Button title="Take an Image" onPress={takeImageHandler} />
    </View>
  )
}

const styles = StyleSheet.create({})