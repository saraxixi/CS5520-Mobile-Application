import { Alert, Button, StyleSheet, Text, View, Image } from 'react-native'
import React, {useState}from 'react'
import * as ImagePicker from 'expo-image-picker';

export default function ImageManager({receiveImageUri}) {
  const [response, requestPermission] = ImagePicker.useCameraPermissions();
  const [imageUri, setImageUri] = useState("");
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
      console.log(result);

      if (!result.canceled) {
        setImageUri(result.assets[0].uri);
        receiveImageUri(result.assets[0].uri);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <View>
      <Button title="Take an Image" onPress={takeImageHandler} />
      {imageUri && (
        <Image 
        source={{
          uri: imageUri
        }}
        style={styles.image}
        alt="preview of the image taken"
      />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  image: {
    width: 100,
    height: 100,
    marginVertical: 10
  }
})