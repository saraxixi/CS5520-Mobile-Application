import { StyleSheet, Text, View, Button, Alert } from 'react-native'
import React, {useState, useEffect} from 'react'
import FontAwesome from '@expo/vector-icons/FontAwesome';
import PressableButton from './PressableButton';
import GoalUsers from './GoalUsers';
import { updateDB } from '../firebase/firestoreHelper';

export default function GoalDetails({ navigation, route }) {
  const [isWarning, setIsWarning] = useState(false);
  function warningHandler() {
    setIsWarning(true);
    navigation.setOptions({ title : "Warning!" });
    updateDB(route.params.goalData.id, { warning: true }, "goals");
  }

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return (
        <PressableButton
          pressedFunction={warningHandler}
          componentStyle={{backgroundColor: 'purple'}}
          pressedStyle={{opacity: 0.5, backgroundColor: 'purple'}}
        >
          <FontAwesome name="warning" size={24} color="#ffcc00" />
        </PressableButton>
        );
      },
    });
  }, []);

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

      <View>
        {route.params && <GoalUsers goalId={route.params.goalData.id}/>}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({})