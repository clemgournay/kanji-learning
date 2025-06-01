import { KanjiMeaning, KanjiReading } from '@models/kanji';
import { StyleSheet, Text, View } from 'react-native';
import { primaryColor, secondaryColor } from '../styles/theme';

type Props = {
  mode: string,
  character: any,
  result: boolean | null,
  readingMode: string,
  lang: string
}

export default function Display({mode, character, result, lang, readingMode}: Props) {

  const renderReadings = (type: string) => {
    return character && character.readings ? character.readings.filter((reading: KanjiReading) => reading.type === type).map((reading: KanjiReading, index) => {
      return (
        <Text key={index} style={styles.reading}>{reading[readingMode as keyof KanjiReading] + '\n'}</Text>
      );
    }) : [];
  } 

  const renderMeanings = character && character.meanings && character.meanings[lang as keyof KanjiMeaning] ? character.meanings[lang as keyof KanjiMeaning]?.map((meaning: string, index) => {
    return (
      <Text key={index} style={styles.meaning}>{meaning + '\n'}</Text>
    );
  }) : [];

  return (
    <View style={styles.container}>
      {(mode === 'kanji') && (
        <View style={styles.subcont}>
          <View style={styles.part}>
            <Text style={styles.partTitle}>Onyomi / 音読み</Text>
            <View style={styles.partCont}>
              <Text>{renderReadings('kunyomi')}</Text>
            </View>
          </View>
          <View style={styles.part}>
            <Text style={styles.partTitle}>Kunyomi / 訓読み</Text>
            <View style={styles.partCont}>
              <Text>{renderReadings('onyomi')}</Text>
            </View>
          </View>
        </View>
      )}
      
      {(mode === 'kanji') && (
        <View style={styles.subcont}>
          <View style={styles.part}>
            <Text style={styles.partTitle}>Meaning / 意味</Text>
            <View style={[styles.partCont, styles.meanings]}>
              <Text>{renderMeanings}</Text>
            </View>
          </View>
          <View style={styles.part}>
            <Text style={styles.partTitle}>Kanji / 漢字</Text>
            <View style={[styles.partCont]}>
              <Text style={styles.character}>{result !== null && character !== null ? character.symbol : '?'}</Text>
            </View>
          </View>
        </View>
      )}

      {character && (mode === 'katakana' || mode === 'hiragana') && (
        <View style={[styles.subcont, styles.kana]}>
          <View style={styles.part}>
            <Text style={styles.partTitle}>Romaji</Text>
            <View style={[styles.partCont]}>
              <Text style={styles.romaji}>{character.key}</Text>
            </View>
          </View>
          <View style={styles.part}>
            <Text style={styles.partTitle}>Kana / かな</Text>
            <View style={[styles.partCont]}>
              <Text style={styles.character}>{result !== null && character !== null ? character.symbol : '?'}</Text>
            </View>
          </View>
        </View>
      )}
      
      
    </View>
  )

}


const styles: any = StyleSheet.create({
  container: {
    width: '100%',
    height: '40%',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    border: '1px solid #ccc',
    margin: 20,
    borderRadius: 10,
    //backgroundColor: 'rgba(255, 255, 255, 0.05)',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    textAlign: 'center',
  },
  subcont: {
    position: 'relative',
    display: 'flex',
    height: '50%',
    flexDirection: 'row',
  },
  kana: {
    height: '100%'
  },
  partTitle: {
    backgroundColor: primaryColor,
    textAlign: 'center',
    height: 30,
    lineHeight: 30,
    color: '#424242'
  },
  part: {
    width: '50%',
    display: 'flex',
    borderRightWidth: 1,
    borderRightColor: 'grey'
  },
  partCont: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
    padding: 10,
    height: '90%',
    overflow: 'auto',
    flex: 1
  },
  reading: {
    fontSize: 36,
    color: '#fff',
    textAlign: 'center',
  },
  meaning: {
    fontSize: 24,
    color: 'white',
    fontStyle: 'italic',
    textAlign: 'center',
  },
  romaji: {
    fontSize: 100,
    color: primaryColor
  },
  character: {
    fontSize: 100,
    color: secondaryColor
  }
});