import { StyleSheet, Text, View, Button, Alert } from 'react-native'
import React, {useState, useLayoutEffect, useEffect} from 'react'
import FontAwesome from '@expo/vector-icons/FontAwesome';
import PressableButton from './PressableButton';
import { addWarningToGoal, fetchGoalData } from '../firebase/firestoreHelper';
import GoalUsers from './GoalUsers';

export default function GoalDetails({ navigation, route }) {
  const [isWarning, setIsWarning] = useState(false);

  useEffect(() => {
    async function loadGoalData() {
      try {
        const goalData = await fetchGoalData(route.params.goalData.id);
        if (goalData) setIsWarning(goalData.warning || false);
      } catch (error) {
        console.error('Failed to load goal data:', error);
      }
    }

    loadGoalData();
  }, [route.params.goalData.id]);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isWarning ? "Warning!" : route.params?.goalData?.text || "More Details",
      headerRight: () => (
        <PressableButton
          pressedFunction={handleWarningToggle}
          componentStyle={{backgroundColor: 'purple'}}
          pressedStyle={{opacity: 1, backgroundColor: 'purple'}}
        >
          <FontAwesome name="warning" size={24} color="#ffcc00" />
        </PressableButton>
      )
    });
  }, [navigation, isWarning, route.params]);

  async function handleWarningToggle() {
    const newWarningStatus = !isWarning;
    setIsWarning(newWarningStatus);

    try {
      await addWarningToGoal(route.params.goalData.id, newWarningStatus);
      Alert.alert(
        'Warning Status Updated',
        `Goal is now marked as ${newWarningStatus ? 'Warning' : 'Normal'}.`
      );
    } catch (error) {
      console.error('Error updating warning status:', error);
    }
  }

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
        <GoalUsers goalId={route.params.goalData.id}/>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({})