import { Button, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Home from './components/Home'
import GoalDetails from './components/GoalDetails'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

const Stack = createNativeStackNavigator();

export default function App() {
  return (
  <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen
        name="Home" 
        component={Home} 
        options={{ title: "All My Goals", headerStyle: {backgroundColor: "purple"}, headerTintColor: { color: "white"}}}/>
      <Stack.Screen
        name="Details" 
        component={GoalDetails} 
        options={({route}) => {
          return {title: route.params ? route.params.goalData.text : "More Details", 
            headerRight: () => {
              return (
                <Button title="Warning" onPress={() => console.log("Warning")} />
              );
          }};
        }}
      />
    </Stack.Navigator>
  </NavigationContainer>
  );
}

const styles = StyleSheet.create({})