import { StyleSheet, TextInput, View, Text, StatusBar, Button, Modal } from 'react-native';
import React from 'react'
import { useState } from 'react';

export default function Input({ textInputFocus, inputHandler, isModalVisible }) {
  const [text, setText] = useState("");
  const [blur, setBlur] = useState(false);
  function handleConfirm() {
    // console.log(text);
    inputHandler(text);
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
        <Button title="Confirm" onPress={handleConfirm} />
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
    marginVertical: 5,
    width: '30%',
  }
})
