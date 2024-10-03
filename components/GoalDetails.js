import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function GoalDetails({ navigation, route }) {
  console.log(route);

  return (
    <View>
      <Text>Details of {route.params.goalData.text} goal with {route.params.goalData.id}</Text>
    </View>
  )
}

const styles = StyleSheet.create({})