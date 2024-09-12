import { StyleSheet, TextInput, View, Text, StatusBar } from 'react-native';
import React from 'react'
import { useState } from 'react';

export default function Input({ shouldFocus }) {
  const [text, setText] = useState("");

  function updateText(changeText) {
    setText(changeText);
  }

  function characterCount() {
    if (text.length > 0) {
      return <Text>Character count: {text.length}</Text>
    } else {
      return null
    }
  }

  return (
    <View>
      <TextInput 
        placeholder='Type something' 
        keyboardType='default' 
        style={{borderBottomColor: 'purple', borderBottomWidth: 2}}
        value={text}
        onChangeText = {updateText}
        autoFocus={shouldFocus}
      />
        <Text>{text}</Text>
        {characterCount()}
    </View>
  );
}

const styles = StyleSheet.create({})
