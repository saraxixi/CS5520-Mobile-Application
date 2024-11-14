import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { auth } from '../firebase/firebaseSetup'
import * as Location from 'expo-location';

export default function LocationManager() {
  return (
    <View>
      <Text>{auth.currentUser.email}</Text>
      <Text>{auth.currentUser.uid}</Text>
    </View>
  )
}

const styles = StyleSheet.create({})