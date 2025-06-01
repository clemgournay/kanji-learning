import { FontAwesome } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';

type Props = {
  result: boolean | null;
}

export default function Result({result}: Props) {
  return (
    <View style={result == null ? [styles.container] : [styles.container, styles.shown]}>
      <View style={result ? [styles.header, styles.success] : [styles.header, styles.failure]}>
        <FontAwesome name={result ? 'check' : 'times'} size={24} color="white"></FontAwesome>
        <Text style={styles.text}>{result ? 'Well done ' : 'Try again'}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    color: 'white',
    display: 'none',
    pointerEvents: 'none'
  },
  shown: {
    display: 'flex'
  },
  header: {
    display: 'flex',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    gap: 10,
  },
  success: {
    backgroundColor: 'green',
  },
  failure: {
    display: 'flex',
    backgroundColor: 'red'
  },
  text: {
    textAlign: 'center',
    color: 'white',
    lineHeight: 50,
    fontSize: 24
  },
});