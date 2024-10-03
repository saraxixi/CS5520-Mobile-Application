import { StyleSheet, Text, View, Button } from 'react-native'
import React from 'react'

export default function GoalDetails({ navigation, route }) {
  console.log(route);

  return (
    <View>
      {route.params ? (
        <Text>
          Details of {route.params.goalData.text} goal with {route.params.goalData.id}
        </Text>
      ):(
        <Text>More Details</Text>
      )}

      <Button title="More Details" onPress={() => navigation.navigate("Details")} />
    </View>
  )
}

const styles = StyleSheet.create({})