import { StyleSheet, Text, View, Button } from 'react-native'
import React, {useState, useLayoutEffect} from 'react'

export default function GoalDetails({ navigation, route }) {
  const [isWarning, setIsWarning] = useState(false);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isWarning ? "Warning!" : route.params?.goalData?.text || "More Details",
      headerRight: () => (
        <Button title="Warning" onPress={() => setIsWarning(!isWarning)} />
      )
    });
  }, [navigation, isWarning, route.params]);

  return (
    <View>
      {route.params ? (
        <Text style={{color: isWarning ? 'red' : 'black'}}>
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