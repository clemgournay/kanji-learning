import Button from '@components/Button';
import ButtonGroup from '@components/ButtonGroup';
import { KeyLabel } from '@models/key-label';
import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { backgroundColor } from '../../styles/theme';

export default function TestSettings () {

  const modes: KeyLabel[] = [
    {key: 'hiragana', label: 'Hiragana'},
    {key: 'katakana', label: 'Katakana'},
    {key: 'kanji', label: 'Kanji'},
  ];

  const hiraganaCategories: KeyLabel[] = [
    {key: 'a', label: 'あ'},
    {key: 'ka', label: 'か'},
    {key: 'sa', label: 'さ'},
    {key: 'ta', label: 'た'},
    {key: 'na', label: 'な'},
    {key: 'ha', label: 'は'},
    {key: 'ma', label: 'ま'},
    {key: 'ra', label: 'ら'},
    {key: 'ya', label: 'や'},
    {key: 'wa', label: 'わ'},
    {key: 'all', label: 'ALL'}
  ];

  const katakanaCategories: KeyLabel[] = [
    {key: 'a', label: 'ア'},
    {key: 'ka', label: 'イ'},
    {key: 'sa', label: 'サ'},
    {key: 'ta', label: 'タ'},
    {key: 'na', label: 'ナ'},
    {key: 'ha', label: 'ハ'},
    {key: 'ma', label: 'マ'},
    {key: 'ya', label: 'ヤ'},
    {key: 'ra', label: 'ラ'},
    {key: 'wa', label: 'ワ'},
    {key: 'all', label: 'ALL'}
  ];

  const kanjiCategories: KeyLabel[] = [
    {key: 'N5', label: 'N5'}, 
    {key: 'N4', label: 'N4'}, 
    {key: 'N3', label: 'N3'}, 
    {key: 'N2', label: 'N2'},
    {key: 'N1', label: 'N1'}
  ];
  const quantities: KeyLabel[] = [
    {key: 10, label: '10'}, 
    {key: 20, label: '20'}, 
    {key: 30, label: '30'}, 
    {key: 50, label: '50'},
    {key: 0, label: 'ALL'}
  ];
  const readingModes: KeyLabel[] = [
    {key: 'romaji', label: 'romaji'},
    {key: 'kana', label: 'かな'}
  ];

  const randomChoices: KeyLabel[] = [
    {key: 'random', label: 'Random'},
    {key: 'normal', label: 'Normal'}
  ];

  const [mode, setMode] = useState<string>('kanji');
  const [level, setLevel] = useState<string>('N5');
  const [category, setCategory] = useState<string>('a');
  const [quantity, setQuantity] = useState<number>(10);
  const [readingMode, setReadingMode] = useState<string>('kana');
  const [random, setRandom] = useState<boolean>(false);

  const selectedMode = (md: any) => {
    setMode(md);
    switch (md) {
      case 'hiragakana':
      case 'katakana':
        setCategory('a');
      break;

      case 'kanji':
        setLevel('N5');
      break;
    }
  }
  
  const selectedCategory = (cat: any) => {
    setCategory(cat);
  }

  const selectedLevel = (cat: any) => {
    setLevel(cat);
  }

  const selectedQuantity = (qty: any) => {
    setQuantity(qty);
  }

  const selectedReadingMode = (mode: any) => {
    setReadingMode(mode);
  }
  const selectedRandom = (rnd: any) => {
    setRandom(rnd === 'random');
  }

  return (
    <View style={styles.container}>
      <View style={styles.field}>
        <Text style={styles.fieldLabel}>Test mode / モード</Text>
        <ButtonGroup mode="horizontal" values={modes} initValue={mode} onSelect={selectedMode}></ButtonGroup>
      </View>
      <View style={styles.field}>
        <Text style={styles.fieldLabel}>Category / カテゴリー</Text>
        {mode === 'hiragana' && (<ButtonGroup mode="separate" values={hiraganaCategories} initValue={category} onSelect={selectedCategory}></ButtonGroup>)}
        {mode === 'katakana' && (<ButtonGroup mode="separate" values={katakanaCategories} initValue={category} onSelect={selectedCategory}></ButtonGroup>)}
        {mode === 'kanji' && (<ButtonGroup mode="horizontal" values={kanjiCategories} initValue={level} onSelect={selectedLevel}></ButtonGroup>)}
      </View>
      {(mode === 'kanji' || category === 'all') && (
        <View style={styles.field}>
          <Text style={styles.fieldLabel}>Number of characters / 文字数</Text>
          <ButtonGroup mode="horizontal" values={quantities} initValue={quantity} onSelect={selectedQuantity}></ButtonGroup>
        </View>
      )}
      {(mode === 'kanji') && (
        <View style={styles.field}>
          <Text style={styles.fieldLabel}>Reading mode / 読み方</Text>
          <ButtonGroup mode="horizontal" values={readingModes} initValue={readingMode} onSelect={selectedReadingMode}></ButtonGroup>
        </View>
      )}

      <View style={styles.field}>
        <Text style={styles.fieldLabel}>Randomness / ランダム</Text>
        <ButtonGroup mode="horizontal" values={randomChoices} initValue={random ? 'random' : 'normal'} onSelect={selectedRandom}></ButtonGroup>
      </View>
      
      
      <View style={styles.startBtn}>
        <Button theme="secondary" iconName="play-circle" label="Start test" path="/test/run" data={{mode, quantity, category, level, readingMode, random}}></Button>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: backgroundColor,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 40,
    padding: 10
  },
  field: {
    width: '100%',
    gap: 10
  },
  fieldLabel: {
    color: 'rgb(174 174 174)',
    fontSize: 20,
  },
  startBtn: {
    marginTop: 40
  }
})