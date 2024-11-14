import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { auth } from '../firebase/firebaseSetup'
import LocationManager from './LocationManager'

export default function Profile() {
  // read user data from firebase
  return (
    <View>
      <Text>{auth.currentUser.email}</Text>
      <Text>{auth.currentUser.uid}</Text>
      <LocationManager />
    </View>
  )
}

const styles = StyleSheet.create({})