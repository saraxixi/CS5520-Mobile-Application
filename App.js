import { Button, StyleSheet, Text, View } from 'react-native'
import React, {useEffect, useState} from 'react'
import Home from './components/Home'
import GoalDetails from './components/GoalDetails'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Login from './components/Login'
import Signup from './components/Signup'
import { auth } from './firebase/firebaseSetup'
import { onAuthStateChanged } from 'firebase/auth'

const Stack = createNativeStackNavigator();

const AuthStack = <>
  <Stack.Screen name="Login" component={Login} />
  <Stack.Screen name="Signup" component={Signup} />
</>;

const AppStack = <>
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
</>;

const commonHeaderStyle = {
  headerStyle: { backgroundColor: "purple" },
  headerTintColor: "white"
}

export default function App() {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsUserLoggedIn(true);
      } else {
        setIsUserLoggedIn(false);
      }
    });
  }, []);

  return (
  <NavigationContainer>
    <Stack.Navigator
      screenOptions={commonHeaderStyle}
      initialRouteName='Login'
    >
      {
        isUserLoggedIn ? AppStack : AuthStack
      }
    </Stack.Navigator>
  </NavigationContainer>
  );
}

const styles = StyleSheet.create({})