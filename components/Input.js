import { StyleSheet, TextInput, View, Text, StatusBar } from 'react-native';
import React from 'react'
import { useState } from 'react';

export default function Input({ shouldFocus }) {
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
        onChangeText={updateText}
        onFocus={handleFocus}
        onBlur={handleBlur}
        autoFocus={shouldFocus}
      />
        <Text>{text}</Text>
        {characterCount()}
        {message !== "" && <Text>{message}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({})
