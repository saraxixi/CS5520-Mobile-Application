import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function PressableButton({children, pressedFunction, componentStyle, pressedStyle}) {
  return (
    <Pressable onPress={pressedFunction} style={(pressed)=> {return [componentStyle, pressedStyle];}}>
      <View>{children}</View>
    </Pressable>
  )
}

const styles = StyleSheet.create({})