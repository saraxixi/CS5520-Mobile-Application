import { Pressable, Button, StyleSheet, Text, View, Alert } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import PressableButton from './PressableButton';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export default function GoalItem({goalObj, deleteHandler, highlight, unhighlight}) {
  const navigation = useNavigation();
  
  function confirmDelete() {
    Alert.alert(
      'Delete Goal',
      'Are you sure you want to delete this goal?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel'
        },
        { text: 'Delete', 
          onPress: handleDelete,
          style: 'destructive'
        }
      ],
      { cancelable: false}
    );
  }

  function handleDelete() {
    console.log("deleted");
    deleteHandler(goalObj.id);
  }

  function handlePress() {
    navigation.navigate("Details", { goalData: goalObj });
  }

  function confirmDelete() {
    Alert.alert(
      "Delete Goal",
      "Are you sure you want to delete this goal?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: handleDelete,
          style: "destructive",
        },
      ],
    );
  }

  return (
    <View style={styles.textContainer}>
      <Pressable 
        onPress={handlePress}
        onLongPress={confirmDelete}
        onPressIn={highlight}
        onPressOut={unhighlight}
        style={({pressed}) => [styles.buttonStyle, pressed && styles.pressedStyle]}
        android_ripple={{ color: 'white', radius: 20}}
      >
        <Text style={styles.text}>{goalObj.text}</Text>
        <PressableButton
          pressedFunction={() => {handleDelete(goalObj.id)}}
          componentStyle={styles.deleteContainer}
          pressedStyle={styles.pressedStyle}
        >
          {/* <Text style={styles.deleteButton}>X</Text> */}
          <MaterialIcons name="delete-outline" size={24} color="white" />
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
      </Pressable>
    </View>
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
        backgroundColor: 'gray',
      },

      pressedStyle: {
        backgroundColor: 'darkgray',
        opacity: 0.5
      },

      deleteButton: {
        fontSize: 20,
        color: 'white',
      },

      buttonStyle: {
        flexDirection: 'row',
        alignItems: 'center',
      }
})