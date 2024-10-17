<<<<<<< HEAD
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import Header from './components/Header';
import Input from './components/Input';
=======
import { Button, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Home from './components/Home'
import GoalDetails from './components/GoalDetails'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

const Stack = createNativeStackNavigator();

const commonHeaderStyle = {
  headerStyle: { backgroundColor: "purple" },
  headerTintColor: "white"
}
>>>>>>> 021b6f771dd0ebd1d0bdd58c24912e2f7a3e44cf

export default function App() {
  return (
<<<<<<< HEAD
    <View style={styles.container}>
      <StatusBar style = "auto" />
      <Header name = {appName} />
      <Input shouldfoucs = {true} />
    </View>
=======
  <NavigationContainer>
    <Stack.Navigator screenOptions={commonHeaderStyle}>
      <Stack.Screen
        name="Home" 
        component={Home} 
        options={{title: "My All Goals"}}
      />
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
>>>>>>> 021b6f771dd0ebd1d0bdd58c24912e2f7a3e44cf
  );
}

const styles = StyleSheet.create({})