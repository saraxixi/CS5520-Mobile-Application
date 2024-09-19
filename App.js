import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, View, Button, SafeAreaView } from 'react-native';
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
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.topView}>
        <Header name = {appName}/>
        <Button title="Add a Goal" onPress={() => setModalVisible(true)}/>
      </View>
      <Input
        shouldFocus={true}
        inputHandler={handleInputData}
        isModalVisible={ModalVisible}
      />
      <View style={styles.bottomView}>
        <Text style={styles.text}>{receivedData}</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // alignItems: 'center',
    justifyContent: 'center',
  },

  text: {
    color: 'purple',
    marginVertical: 5,
  },

  topView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  bottomView: {
    flex: 4,
    backgroundColor: '#dcd',
    alignItems: 'center',
  }
});
