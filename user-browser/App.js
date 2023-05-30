import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Allok from './src';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Zaglushka</Text>
      <Allok/>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D9F1F9',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
