import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { auth } from '../firebase/firebaseSetup'

export default function Profile() {
  // read user data from firebase
  return (
    <View>
      <Text>{auth.currentUser.email}</Text>
      <Text>{auth.currentUser.uid}</Text>
    </View>
  )
}

const styles = StyleSheet.create({})