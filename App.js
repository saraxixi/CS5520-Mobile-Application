import { Button, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Home from './components/Home'
import GoalDetails from './components/GoalDetails'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Login from './components/Login'
import Signup from './components/Signup'

const Stack = createNativeStackNavigator();

const commonHeaderStyle = {
  headerStyle: { backgroundColor: "purple" },
  headerTintColor: "white"
}

export default function App() {
  return (
  <NavigationContainer>
    <Stack.Navigator
      screenOptions={commonHeaderStyle}
      initialRouteName='Login'>
      
      <Stack.Screen name="Login" component={Login} options={{title: "Login"}}/>
      <Stack.Screen name="Signup" component={Signup} options={{title: "Signup"}}/>
      
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
  );
}

const styles = StyleSheet.create({})