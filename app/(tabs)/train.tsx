import { StyleSheet, Text, View } from 'react-native';
import { backgroundColor } from '../styles/theme';

export default function TrainScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Train</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: backgroundColor,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    color: '#fff'
  }
})