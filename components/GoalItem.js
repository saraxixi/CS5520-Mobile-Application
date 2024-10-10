import { Pressable, Button, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import PressableButton from './PressableButton';
import Feather from '@expo/vector-icons/Feather';

export default function GoalItem({goalObj, deleteHandler}) {
  const navigation = useNavigation();

  function handleDelete() {
    console.log("deleted");
    deleteHandler(goalObj.id);
  }

  function handlePress() {
    navigation.navigate("Details", { goalData: goalObj });
  }

  return (
    <Pressable 
      onPress={handlePress}
      android_ripple={{ color: '#ddd', borderless: false}}>
    <View style={styles.textContainer}>
        <Text style={styles.text}>{goalObj.text}</Text>
        <PressableButton
          pressedFunction={() => {handleDelete(goalObj.id)}}
          componentStyle={styles.deleteContainer}
          pressedStyle={styles.pressedStyle}
        >
          {/* <Text style={styles.deleteButton}>X</Text> */}
          <Feather name="delete" size={24} color="black" />
        </PressableButton>
        {/* <Button
          title="X"
          onPress={() => {
            handleDelete(goalObj.id);
          }}
          color={'grey'}
        /> */}
        {/* <Button
          title="i"
          onPress={() => {
            handlePress();
          }}
          color={'grey'}
        /> */}
    </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
    textContainer: {
        backgroundColor: '#aaa',
        borderRadius: 10,
        marginTop: 5,
        flexDirection: 'row',
        alignItems: 'center',
      },
    
      text: {
        color: 'purple',
        fontSize: 25,
        padding: 10,
      },

      deleteContainer: {
        // backgroundColor: 'black',
        padding: 10,
        borderRadius: 10,
      },

      pressedStyle: {
        // backgroundColor: 'red',
        opacity: 0.5
      },

      deleteButton: {
        fontSize: 20,
        color: 'white',
      }
})