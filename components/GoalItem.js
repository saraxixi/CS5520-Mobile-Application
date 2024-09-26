import { Button, StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function GoalItem({goalObj, handleDelete}) {
  return (
    <View style={styles.textContainer}>
        <Text style={styles.text}>{goalObj.text}</Text>
        <Button
            title="X"
            onPress={() => {
                handleDelete(goalObj.id);
            }}
            color={'grey'}
        />
    </View>
  )
}

const styles = StyleSheet.create({
    textContainer: {
        backgroundColor: '#aaa',
        borderRadius: 10,
        marginTop: 5,
        flexDirection: 'row',
        alignItems: 'center',
      },
    
      text: {
        color: 'purple',
        fontSize: 25,
        padding: 10,
      },
})