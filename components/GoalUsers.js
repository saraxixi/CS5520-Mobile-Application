import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'

export default function GoalUsers() {
  useEffect(() => {
    async function fetchData() {
      const response = await fetch('https://jsonplaceholder.typicode.com/users');
    }
    fetchData();
  }, []);

  return (
    <View>
      <Text>GoalUsers</Text>
    </View>
  )
}

const styles = StyleSheet.create({})