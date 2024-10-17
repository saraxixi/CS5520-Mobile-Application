import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, SafeAreaView, FlatList, Alert} from 'react-native';
import React, {useEffect, useState} from 'react'
import Header from './Header';
import Input from './Input';
import GoalItem from './GoalItem';
import PreesableButton from './PressableButton';
import { database } from '../firebase/firebaseSetup';
import { writeToDB } from '../firebase/firestoreHelper';
import { onSnapshot } from 'firebase/firestore';
import { collection } from 'firebase/firestore';

export default function Home({ navigation }) {
  console.log(database);
  const [receivedData, setReceivedData] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [goals, setGoals] = useState([]);
  const appName = "My awesome app"

  useEffect(() => {
    // querySnapshot is the list of documentSnapshots
    onSnapshot(collection(database, "goals"), (querySnapshot) => {
      let newArray = [];
      querySnapshot.forEach((docSnapshot) => {
        // console.log("SnapShot", docSnapshot);
        newArray.push({...docSnapshot.data(), id: docSnapshot.id});
      });
      console.log("New Array", newArray);
      setGoals(newArray);
    });
  }, []);
  

  function handleInputData(receivedData) {
    console.log('App', receivedData);
    let newGoals = {text: receivedData};
    writeToDB(newGoals, "goals");
    // update the goals array to have the new goal as an item
    // const newArray = {...goals, newGoals};
    // setGoals((prevGoals) => {return [...prevGoals, newGoals]});

    console.log(newGoals);
    setReceivedData(receivedData);
    setModalVisible(false);
  }

  function dismissModal() {
    setModalVisible(false);
  }

  function handleGoalDelete(deletedId) {
    setGoals((prevGoals) => {
      return prevGoals.filter((goalObj) => {
        return goalObj.id != deletedId;
      });
    });
  }

  // function handleGoalPress(pressedGoal) {
  //   //receive the goal obj
  //   console.log(pressedGoal);
  //   navigation.navigate("Details", { goalData: pressedGoal });
  // }

  function deleteAllGoals() {
    Alert.alert(
      "Delete All Goals",
      "Are you sure you want to delete all goals?",
      [
        {
          text: "Yes",
          onPress: () => setGoals([])
        },
        {
          text: "No",
          style: "cancel",
        },
      ]
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.topView}>
        <Header name = {appName}/>
        <PreesableButton
          pressedFunction={() => setModalVisible(true)}
          componentStyle={{backgroundColor: 'purple'}}
        >
          <Text style={styles.buttonText}>Add a Goal</Text>
        </PreesableButton>
      </View>
      <Input
        textInputFocus={true}
        inputHandler={handleInputData}
        isModalVisible={modalVisible}
        setIsModalVisible={setModalVisible}
      />
      <View style={styles.bottomView}>
        <FlatList
          contentContainerStyle={styles.scrollViewContainer}
          data={goals}
          renderItem={({item, separators}) => (
            <GoalItem
              deleteHandler={handleGoalDelete}
              goalObj={item}
              highlight={separators.highlight}
              unhighlight={separators.unhighlight}
            />
          )}
          ListEmptyComponent={
            <Text style={styles.text}>No goals to show</Text>
          }
          ListHeaderComponent={
            goals.length > 0 && (<Text style={styles.text}>Goals</Text>)
          }
          ListFooterComponent={
            goals.length > 0 && (
              <View style={styles.footerContainer}>
                <Button title="Delete all" onPress={deleteAllGoals}/>
              </View>
            )
          }
          ItemSeparatorComponent={({highlighted}) => 
            <View style={[styles.separator, highlighted && {backgroundColor: 'purple'}]}/>
          }
        />
        {/* <ScrollView contentContainerStyle={styles.scrollViewContainer}>
          {goals.map((goalObj) => {
            return (
              <View key={goalObj.id} style={styles.textContainer}>
                <Text style={styles.text}>{goalObj.text}</Text>
              </View>
            );
          })}
        </ScrollView> */}
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

  scrollViewContainer: {
    alignItems: "center",
  },

  footerContainer: {
    marginTop: 20,
    alignItems: "center",
  },

  separator: {
    height: 5,
    backgroundColor: 'darkgray',
    marginVertical: 10,
  },

  buttonText: {
    color: 'white',
    fontSize: 20,
  }
});
