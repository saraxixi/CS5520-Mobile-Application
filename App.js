import { Button, Pressable, StyleSheet, Text, View } from 'react-native'
import React, {useEffect, useState} from 'react'
import Home from './components/Home'
import GoalDetails from './components/GoalDetails'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Login from './components/Login'
import Signup from './components/Signup'
import { auth } from './firebase/firebaseSetup'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import PressableButton from './components/PressableButton'
import { AntDesign } from '@expo/vector-icons'
import Profile from './components/Profile'
import Map from './components/Map'
import * as Notifications from 'expo-notifications'

Notifications.setNotificationHandler({
  handleNotification: async () => {
    return { shouldShowAlert: true };
  },
});

const Stack = createNativeStackNavigator();

const AuthStack = <>
  <Stack.Screen name="Login" component={Login} />
  <Stack.Screen name="Signup" component={Signup} />
</>;

const AppStack = <>
  <Stack.Screen
        name="Home" 
        component={Home} 
        options={({ navigation }) => {
          return {
            title: "My Goals",
            headerRight: () => {
              return (
                <PressableButton
                  componentStyle={{backgroundColor: "purple"}}
                  pressedFunction={() => {
                    navigation.navigate("Profile");
                  }}
                >
                  <AntDesign name="user" size={24} color="white" />
                </PressableButton>
              );
            },
          };
        }}
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

      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{
          headerRight: () => {
            return (
              <PressableButton
                componentStyle={{backgroundColor: "purple"}}
                pressedFunction={() => {
                  signOut(auth);
                }}
              >
                <AntDesign name="logout" size={24} color="white" />
              </PressableButton>
            );
          },
        }}
      />

      <Stack.Screen name="Map" component={Map} />
</>;

const commonHeaderStyle = {
  headerStyle: { backgroundColor: "purple" },
  headerTintColor: "white"
}

export default function App() {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsUserLoggedIn(true);
      } else {
        setIsUserLoggedIn(false);
      }
    });
    return () => {
      unsubscribe();
    }
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