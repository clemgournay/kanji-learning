import { StyleSheet, Text, View } from 'react-native';

import Button from '@components/Button';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { KanaService } from '@services/kana.service';
import { useSegments } from 'expo-router';
import { useEffect, useState } from 'react';
import { backgroundColor, primaryColor } from '../../styles/theme';


export default function Result() {

  const segments = useSegments();
  let [mode, setMode] = useState<string>('kanji');
  let [quantity, setQuantity] = useState<number>(10);
  let [level, setLevel] = useState<string>('N5');
  let [category, setCategory] = useState<string>('a');
  let [nbSuccess, setNbSuccess] = useState<number>(0);
  let [kanaLabel, setKanaLabel] = useState<string>('あ');

  useEffect(() => {

    console.log('USE EFFECT');
    const init = async () => {
      const md = await AsyncStorage.getItem('mode');
      if (md) setMode(md);
      const qt = await AsyncStorage.getItem('quantity');
      if (qt) setQuantity(parseInt(qt));
      const cat = await AsyncStorage.getItem('category');
      if (cat) setCategory(category);
      const lvl = await AsyncStorage.getItem('level');
      if (lvl) setLevel(lvl);
      const nbSuc = await AsyncStorage.getItem('nb_success');
      if (nbSuc) setNbSuccess(parseInt(nbSuc));
      console.log(nbSuccess, quantity, level);

      if (mode !== 'kanji') {
        const kanaService = new KanaService();
        const kanas = await kanaService.getByType(mode, category);
        const label = kanas.find(k => k.key === category);
        if (label) setKanaLabel(label.symbol);
      }
    
    }

    init();

  }, [segments]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Test {mode} - {mode === 'kanji' ? level : kanaLabel}</Text>
      <Text style={styles.result}>{nbSuccess} / {quantity}</Text>
      <Button theme="secondary" iconName="play-circle" label="New test" path="/test"></Button>
    </View>
  )

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: backgroundColor
  },
  title: {
    fontSize: 50,
    color: primaryColor
  },
  result: {
    fontSize: 100,
    margin: 40,
    color: 'orange'
  }
})