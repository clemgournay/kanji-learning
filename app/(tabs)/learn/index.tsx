import Button from '@components/Button';
import { StyleSheet, View } from 'react-native';
import { backgroundColor } from '../../styles/theme';

export default function LearnScreen() {
  return (
    <View style={styles.container}>
      <Button theme="primary" iconName="graduation-cap" label="Hiragana / ひらがな" path="learn/list" data={{mode: 'hiragana'}}></Button>
      <Button theme="primary" iconName="graduation-cap" label="Katakana / カタカナ" path="learn/list" data={{mode: 'katakana'}}></Button>
      <Button theme="primary" iconName="graduation-cap" label="Kanji N5 / 漢字 5級" path="learn/list" data={{mode: 'kanji', level: 'N5'}}></Button>
      <Button theme="primary" iconName="graduation-cap" label="Kanji N4 / 漢字 4級" path="learn/list" data={{mode: 'kanji', level: 'N4'}}></Button>
      <Button theme="primary" iconName="graduation-cap" label="Kanji N3 / 漢字 3級" path="learn/list" data={{mode: 'kanji', level: 'N3'}}></Button>
      <Button theme="primary" iconName="graduation-cap" label="Kanji N2 / 漢字 2級" path="learn/list" data={{mode: 'kanji', level: 'N2'}}></Button>
      <Button theme="primary" iconName="graduation-cap" label="Kanji N1 / 漢字 1級" path="learn/list" data={{mode: 'kanji', level: 'N1'}}></Button>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: backgroundColor,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 40
  },
  text: {
    color: '#fff'
  },
  btnContainer: {
    flexDirection: 'column',
    gap: 20,
    flex: 1,
    alignItems: 'center'
  }
})