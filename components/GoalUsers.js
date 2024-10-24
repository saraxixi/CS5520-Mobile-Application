import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { readAllDocs, writeToDB } from '../firebase/firestoreHelper';

export default function GoalUsers({ goalId }) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        // check if there is any data in ueser subcollection
        const dataFromDB = await readAllDocs(`goals/${goalId}/users`);
        if (dataFromDB.length) {
          setUsers(dataFromDB.map((user) => {return user.name}));
        }

        // if not the proceed with fetching from fake API
        console.log('data from API');


        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        console.log(response.status);
        
        if (!response.ok) {
          throw new Error('HTTP Error happen with status: ' + response.status);
        }
        const data = await response.json();
        // write data to firestore use wirteToDb
        data.forEach((user) => {  
          writeToDB(user, `goals/${goalId}/users`);
        });
        setUsers(data.map((user) => {return user.name}));
      } catch (err) {
        console.error('Failed to fetch data:', err);
      }
    }
    fetchData();
  }, []);

  return (
    <View>
      <FlatList
        data={users}
        renderItem={({ item }) => (
          <Text>{item}</Text>
        )}
      />
    </View>
  )
}

const styles = StyleSheet.create({})