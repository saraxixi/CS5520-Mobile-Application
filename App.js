import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, View, Button, SafeAreaView, ScrollView } from 'react-native';
import React, {useState}from 'react'
import Header from './components/Header';
import Input from './components/Input';

export default function App() {
  const [receivedData, setReceivedData] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [goals, setGoals] = useState([]);
  const appName = "My awesome app"

  function handleInputData(receivedData) {
    console.log(receivedData);
    let newGoals = {text: receivedData, id: Math.random()};
    // update the goals array to have the new goal as an item
    // const newArray = {...goals, newGoals};
    setGoals((prevGoals) => {return [...prevGoals, newGoals]});

    //console.log(newGoals);
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
        textInputFocus={true}
        inputHandler={handleInputData}
        isModalVisible={modalVisible}
        setIsModalVisible={setModalVisible}
      />
      <View style={styles.bottomView}>
        <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        {/*use array.map to show a list of goals*/}
        {goals.map((goalObj) => {
            return (
              <View key={goalObj.id} style={styles.textContainer}>
                <Text style={styles.text}>{goalObj.text}</Text>
              </View>
            );
          })}
        </ScrollView>
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
    fontSize: 25,
    padding: 10,
  },

  topView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  bottomView: {
    flex: 4,
    backgroundColor: '#dcd',
  },

  textContainer: {
    backgroundColor: '#aaa',
    borderRadius: 10,
  },

  scrollViewContainer: {
    alignItems: "center",
  },
});
