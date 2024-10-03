import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, View, Button, SafeAreaView, ScrollView, FlatList, Alert} from 'react-native';
import React, {useState}from 'react'
import Header from './Header';
import Input from './Input';
import GoalItem from './GoalItem';

export default function Home({ navigation }) {
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

  function handleGoalPress(pressedGoal) {
    //receive the goal obj
    console.log(pressedGoal);
    // navigate to GoalDetails and pass goal obj as params
    navigation.navigate("Details", { goalData: pressedGoal });
  }

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
        <Button title="Add a Goal" onPress={() => setModalVisible(true)}/>
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
          ListEmptyComponent={() => {
            return (<Text style={styles.text}>No goals to show</Text>)
          }}
          ListHeaderComponent={() => {
            return (goals.length > 0 && (<Text style={styles.text}>Goals</Text>))
          }}
          ListFooterComponent={() => {
            return (
              goals.length > 0 && (
              <View style={styles.footerContainer}>
              <Button title="Delete all" onPress={deleteAllGoals}/>
              </View>)
            )
          }}
          ItemSeparatorComponent={() => {
            return (<View style={styles.separator}/>)
          }}
          renderItem={({item}) => {
            console.log(item);
            return (
            <GoalItem
              pressHandler={handleGoalPress}
              deleteHandler={handleGoalDelete}
              goalObj={item}
            />
          );
          }}
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
});
