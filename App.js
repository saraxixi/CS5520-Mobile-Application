import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, View, Button } from 'react-native';
import React, {useState}from 'react'
import Header from './components/Header';
import Input from './components/Input';

export default function App() {
  const [receivedData, setReceivedData] = useState("");
  const [ModalVisible, setModalVisible] = useState(false);
  const appName = "My awesome app"

  function handleInputData(receivedData) {
    console.log(receivedData);
    setReceivedData(receivedData);
    setModalVisible(false);
  }

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Header name = {appName}/>
      <Button title="Add a Goal" onPress={() => setModalVisible(true)}/>
      <Input 
        shouldFocus={true}
        inputHandler={handleInputData}
        isModalVisible={ModalVisible}
      />
      <Text>{receivedData}</Text>
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
