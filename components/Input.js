import { StyleSheet, TextInput, View, Text, StatusBar, Button, Modal } from 'react-native';
import React from 'react'
import { useState } from 'react';

export default function Input({ shouldFocus, inputHandler, isModalVisible }) {
  const [text, setText] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [message, setMessage] = useState("");

  function updateText(changeText) {
    setText(changeText);
  }

  function handleBlur() {
    setIsFocused(false);
    if (text.length < 3) {
      setMessage("Please type more than 3 characters");
    } else {
      setMessage("Thank you!");
    }
  }

  function handleFocus() {
    setIsFocused(true);
    setMessage("");
  }

  function characterCount() {
    if (isFocused && text.length > 0) {
      return <Text>Character count: {text.length}</Text>
    } else {
      return null
    }
  }

  function handleConfirm() {
    console.log('pressed');
    // call the callback function received from the parent component
    // pass what user has typed
    inputHandler(text);
  }

  return (
    <Modal animationType='slide' visible={isModalVisible}>
      <View style={styles.container}>
        <TextInput style={styles.input}
          placeholder='Type something' 
          keyboardType='default' 
          // style={{borderBottomColor: 'purple', borderBottomWidth: 2}}
          value={text}
          onChangeText={updateText}
          onFocus={handleFocus}
          onBlur={handleBlur}
          autoFocus={shouldFocus}
        />
          <Text>{text}</Text>
          {characterCount()}
          {message !== "" && <Text>{message}</Text>}
          <Button 
            title="Confirm"
            onPress={handleConfirm} />
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
    boarderWidth: 2, 
    padding: 5,
  },

  buttonContainer: {
    marginVertical: 5,
    width: '30%',
  }
})
