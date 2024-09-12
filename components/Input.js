import { StyleSheet, TextInput, View, Text, StatusBar } from 'react-native';
import React from 'react'
import { useState } from 'react';

export default function Input({ shouldFocus }) {
  const [text, setText] = useState("");

  function updateText(changeText) {
    setText(changeText);
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
    </View>

  )
}

const styles = StyleSheet.create({})
