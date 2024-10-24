import { StyleSheet, Text, View, useWindowDimensions, Dimensions } from 'react-native'
import React from 'react'

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function Header({ name }) {
  const { width, height } = useWindowDimensions();

  return (
    <View>
        <Text style={[styles.text, { paddingVertical: height < 415 ? 0 : 10}]}>
          Welcome to {name}!
        </Text>
    </View>
  );
}

const styles = StyleSheet.create({  
  text: {
    color: "darkmagenta",
    fontSize: windowWidth < 400 ? 20 : 26,
    borderColor: "darkmagenta",
    borderWidth: 2,
    padding: 5,
    marginBottom: 10,
  },
})