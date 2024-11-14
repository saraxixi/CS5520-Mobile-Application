import { StyleSheet, Text, View, Button, Image } from 'react-native'
import React, {useState, useEffect} from 'react'
import FontAwesome from '@expo/vector-icons/FontAwesome';
import PressableButton from './PressableButton';
import GoalUsers from './GoalUsers';
import { updateDB } from '../firebase/firestoreHelper';
import { storage } from '../firebase/firebaseSetup';
import { ref, getDownloadURL } from 'firebase/storage';


export default function GoalDetails({ navigation, route }) {
  const [isWarning, setIsWarning] = useState(false);
  const [imageUri, setImageUri] = useState('');

  function warningHandler() {
    setIsWarning(true);
    navigation.setOptions({ title : "Warning!" });
    updateDB(route.params.goalData.id, { warning: true }, "goals");
  }

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return (
        <PressableButton
          pressedFunction={warningHandler}
          componentStyle={{backgroundColor: 'purple'}}
          pressedStyle={{opacity: 0.5, backgroundColor: 'purple'}}
        >
          <FontAwesome name="warning" size={24} color="#ffcc00" />
        </PressableButton>
        );
      },
    });
  }, []);

  useEffect(() => {
    async function getImageUri() {
      try {
        if (route.params && route.params.goalData.imageUri) {
          const imageRef = ref(storage, route.params.goalData.imageUri);
          const httpsImageUri = await getDownloadURL(imageRef);
          setImageUri(httpsImageUri);
        }
      } catch (error) {
        console.log('get image uri' + error);
      }
    }
    getImageUri();
  }, []);

  return (
    <View>
      {route.params ? (
        <Text style={{color: isWarning ? 'red' : 'black'}}>
          Details of {route.params.goalData.text} goal with {route.params.goalData.id}
        </Text>
      ):(
        <Text>More Details</Text>
      )}

      <Button title="More Details" onPress={() => navigation.navigate("Details")} />

      <View>
        {route.params && <GoalUsers goalId={route.params.goalData.id}/>}
        {imageUri && <Image source={{uri: imageUri}} style={styles.image} />}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  image: {
    width: 200,
    height: 200,
  }
})