import { FontAwesome } from '@expo/vector-icons'
import { Kana } from '@models/kana'
import { Kanji } from '@models/kanji'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { secondaryColor } from '../styles/theme'

type Props = {
  current: number,
  characters: Kanji[] | Kana[],
  showNext: boolean,
  onNext?: () => void
}

export default function Testbar ({current, characters, showNext, onNext}: Props) {

  const handlePress = () => {
    if (onNext) onNext();
  }

  return (
    <View style={styles.container}>
      <View style={styles.progressCont}>
        <Text style={styles.progress}>{current+1} / {characters.length}</Text>
      </View>
      <View style={showNext ? [styles.nextCont, styles.nextActive] : [styles.nextCont]}>
        <Pressable style={styles.nextBtn} onPress={() => handlePress()}>
          <FontAwesome name="arrow-circle-right" color="white" size={30}></FontAwesome>
        </Pressable>
      </View>
      
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '15%',
    display: 'flex',
    flexDirection: 'row',
    borderRadius: 10,
    overflow: 'hidden'
  },
  progressCont: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '50%',
    height: '100%',
    backgroundColor: 'orange',
  },
  progress: {
    color: 'white',
    fontSize: 20
  },
  nextCont: {
    width: '50%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
    backgroundColor: 'grey',
    color: 'white',
    opacity: 0.2
  },
  nextBtn: {
    display: 'flex',
    flexDirection: 'row',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  nextActive: {
    backgroundColor: secondaryColor,
    opacity: 1
  }
})