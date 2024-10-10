import { StyleSheet, Text, View, Button } from 'react-native'
import React, {useState, useLayoutEffect} from 'react'
import FontAwesome from '@expo/vector-icons/FontAwesome';
import PressableButton from './PressableButton';

export default function GoalDetails({ navigation, route }) {
  const [isWarning, setIsWarning] = useState(false);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isWarning ? "Warning!" : route.params?.goalData?.text || "More Details",
      headerRight: () => (
        <PressableButton
          pressedFunction={() => setIsWarning(!isWarning)}
          componentStyle={{backgroundColor: 'purple'}}
          pressedStyle={{opacity: 1, backgroundColor: 'purple'}}
        >
          <FontAwesome name="warning" size={24} color="#ffcc00" />
        </PressableButton>
        // <Button title="Warning" onPress={() => setIsWarning(!isWarning)} />
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