import { StyleSheet, TextInput, View, Text, StatusBar, Button, Modal, Alert, Image} from 'react-native';
import React from 'react'
import { useState } from 'react';

export default function Input({ textInputFocus, inputHandler, isModalVisible, setIsModalVisible }) {
  const [text, setText] = useState("");
  const [blur, setBlur] = useState(false);
  const minChar = 3;
  function handleConfirm() {
    // console.log(text);
    setText("");
    inputHandler(text);
  }
  function handleCancel() {
    Alert.alert("Confirm Cancel", "Are you sure you want to cancel?", 
      [{
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel'
      },
      {
        text: 'OK',
        onPress: () => {
          setText("");
          setIsModalVisible(false);
        }
      }]
    );
  }

  function characterCount() {
    if (text.length > 0) {
      return <Text style = {styles.charCount} > Character Count: {text.length}</Text>
    } else {
      return null;
    }
  }

  return (
    <Modal animationType="slide" visible={isModalVisible} transparent={true}>
      <View style={styles.container}>
        <View style={styles.modalContainer}>
        <View>
          <Image 
            style={styles.image}
            source={require('../assets/image.png')}
            /* aIt serves as a description that will be read aloud by screen readers,
            improving accessibility for users with disabilities. In web applications,
            it is also displayed if the image fails to load. */
            alt="Local image of a document icon" />
          <Image 
            style={styles.image}
            source={{uri: 'https://cdn-icons-png.flaticon.com/512/2617/2617812.png'}} 
            alt="Network image of a document icon"
          />
        </View>
        <TextInput
          autoFocus={textInputFocus}
          placeholder="Type something"
          autoCorrect={true}
          keyboardType="default"
          value={text}
          style={styles.input}
          onChangeText={(changedText) => {
            setText(changedText);
          }}
          onBlur={() => {
            setBlur(true);
          }}
          onFocus={() => {
            setBlur(false);
          }}
        />

        {blur ? (
          text.length >= 3 ? (
            <Text>Thank you</Text>
          ) : (
            <Text>Please type more than 3 characters</Text>
          )
        ) : (
          text && <Text>{text.length}</Text>
        )}
        <View style={styles.buttonContainer}>
          <Button title="Cancel" onPress={handleCancel} />
          <Button title="Confirm" onPress={handleConfirm} disabled={text.length < minChar}/>
        </View>
      </View>
    </View>
    </Modal>
  );
}

const styles = StyleSheet.create({  
  container: {
    flex: 1,
    // backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  input: {
    borderColor: 'purple', 
    borderWidth: 2, 
    padding: 10,
    marginTop: 20,
  },

  buttonContainer: {
    flexDirection: 'row',
    marginTop: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
    // width: '30%',
  },

  image: {
    width: 100,
    height: 100,
  },

  modalContainer: {
    backgroundColor: '#aaa',
    borderRadius: 10,
    alignItems: "center",
    width: '80%',
  }
})
