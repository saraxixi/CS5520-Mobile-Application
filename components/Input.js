import { StyleSheet, TextInput, View, Text, StatusBar, Button, Modal, Alert, Image} from 'react-native';
import React from 'react'
import { useState } from 'react';

export default function Input({ textInputFocus, inputHandler, isModalVisible, setIsModalVisible }) {
  const [text, setText] = useState("");
  const [blur, setBlur] = useState(false);
  const minChar = 3;
  function handleConfirm() {
    // console.log(text);
    setText("");
    inputHandler(text);
  }
  function handleCancel() {
    Alert.alert("Confirm Cancel", "Are you sure you want to cancel?", 
      [{
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel'
      },
      {
        text: 'OK',
        onPress: () => {
          setText("");
          setIsModalVisible(false);
        }
      }]
    );
  }
  return (
    <Modal animationType="slide" visible={isModalVisible}>
      <View style={styles.container}>
        <TextInput
          autoFocus={textInputFocus}
          placeholder="Type something"
          autoCorrect={true}
          keyboardType="default"
          value={text}
          style={styles.input}
          onChangeText={(changedText) => {
            setText(changedText);
          }}
          onBlur={() => {
            setBlur(true);
          }}
          onFocus={() => {
            setBlur(false);
          }}
        />

        {blur ? (
          text.length >= 3 ? (
            <Text>Thank you</Text>
          ) : (
            <Text>Please type more than 3 characters</Text>
          )
        ) : (
          text && <Text>{text.length}</Text>
        )}
        <View>
          <Image 
            style={styles.image}
            source={require('/Users/sara/Documents/CS5520/MobileApplication/assets/image.png')}
            alt="Local image of a document icon" />
          <Image 
            style={styles.image}
            source={{uri: 'https://cdn-icons-png.flaticon.com/512/2617/2617812.png'}} 
            alt="Network image of a document icon"
          />
          
        </View>
        <View style={styles.buttonContainer}>
          <Button title="Confirm" onPress={handleConfirm} disabled={text.length < minChar}/>
          <Button title="Cancel" onPress={handleCancel} />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({  
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  input: {
    borderColor: 'purple', 
    borderWidth: 2, 
    padding: 5,
  },

  buttonContainer: {
    flexDirection: 'row',
    marginTop: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
    // width: '30%',
  },

  image: {
    width: 100,
    height: 100,
  }
})
