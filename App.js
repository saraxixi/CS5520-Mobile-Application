import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import Header from './components/Header';
import Input from './components/Input';

export default function App() {
  // const [receivedData, setReceivedData] = useState("");
  const appName = "My awesome app"

  function handleInputData(receivedData) {
    console.log(receivedData);

  }

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Header name = {appName}/>
      <Input shouldFocus={true} inputHandler={handleInputData}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
