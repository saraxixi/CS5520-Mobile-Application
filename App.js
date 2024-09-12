import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import Header from './components/Header';
import Input from './components/Input';
import { useState } from 'react';

export default function App() {
  const appName = "My awesome app"

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Header name = {appName}/>
      <Input />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
