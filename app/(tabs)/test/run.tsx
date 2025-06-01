import { useAudioPlayer } from 'expo-audio';
import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';

import Display from '@components/Display';
import Result from '@components/Result';
import Testbar from '@components/Testbar';
import Writepad from '@components/Writepad';

import { Kanji } from '@models/kanji';

import { useRoute } from '@react-navigation/native';
import { KanaService } from '@services/kana.service';
import { KanjiService } from '@services/kanji.service';

import { API_URL } from '@utils/backend';
import { useRouter, useSegments } from 'expo-router';
import { io, Socket } from 'socket.io-client';
import { backgroundColor } from '../../styles/theme';

import AsyncStorage from '@react-native-async-storage/async-storage';

const SuccessSoundAsset = require('@assets/sounds/success.mp3');
const FailSoundAsset = require('@assets/sounds/fail.mp3');

export default function TestScreen() {

  const route = useRoute();
  const router = useRouter();
  const params: any = route.params;
  const segments = useSegments()

  const mode = params['mode'] ? params['mode'] : 'kanji';
  const type = params['type'] ? params['type'] : 'hiragana';
  let quantity = params['quantity'] ? parseInt(params['quantity']) : 0;
  const category = params['category'] ? params['category'] : 'a';
  const level = params['level'] ? params['level'] : 'N5';
  const readingMode = params['readingMode'] ? params['readingMode'] : 'kana';
  const random = params['random'] ? eval(params['random']) : false;

  const [socketID, setSocketID] = useState<string | null>(null);
  const [socket, setSocket] = useState<Socket | null>(null);
  const [character, setCharacter] = useState<Kanji | null>(null);
  const [characters, setCharacters] = useState<Kanji[]>([]);
  const [current, setCurrent] = useState<number>(0);
  const [result, setResult] = useState<boolean | null>(null);
  const [lang, setLang] = useState<string>('en');
  const [showNext, setShowNext] = useState<boolean>(false);
  const [nbSuccess, setNbSuccess] = useState<number>(0);

  const successSound = useAudioPlayer(SuccessSoundAsset);
  const failSound = useAudioPlayer(FailSoundAsset);

  const handleNext = async () => {
    console.log('NEXT');
    let newCurrent = current;
    if (current < characters.length - 1) newCurrent = current + 1;
    else {
      console.log('SAVE NB SUCCESS', nbSuccess);
      await AsyncStorage.setItem('nb_success', nbSuccess.toString());
      router.navigate('/test/result');
    }  
    const newCharacter = characters[newCurrent];
    setCurrent(newCurrent);
    setCharacter(newCharacter)
    setShowNext(false);
    setResult(null);
    socket?.emit('new character', newCharacter);
  }

  useEffect(() => {
    
    const socket = io(API_URL, {query: {mode: 'app'}});

    const init = async () => {
      await AsyncStorage.setItem('mode', mode);
      await AsyncStorage.setItem('type', type);
      await AsyncStorage.setItem('quantity', characters.length.toString());
      await AsyncStorage.setItem('category', category);
      await AsyncStorage.setItem('level', level);
      await AsyncStorage.setItem('nb_success', '0');
    }

    socket.on('connect', async () => {
      if (socket && socket.id) setSocketID(socket.id);
      setSocket(socket);
      let characterList: any[]
      switch (mode) {
        case 'katakana':
        case 'hiragana':
          const kanaService = new KanaService();
          characterList = await kanaService.getByType(type, category, 1, quantity, random);
        break;
        case 'kanji':
          const kanjiService = new KanjiService();
          characterList = await kanjiService.getByLevel(level, 1, quantity, random);
        break;
      }
      let newCharacter = characterList[0];
      setCharacters(characterList);
      setCharacter(newCharacter);
      setCurrent(0);
      setNbSuccess(0);
      console.log('RESET');
      socket.emit('new character', newCharacter);
    });

    socket.on('receive result', (backResult: boolean) => {
      if (backResult) {
        successSound.seekTo(0);
        successSound.play();
        setNbSuccess(nbSuccess => nbSuccess + 1);
      } else {
        failSound.seekTo(0);
        failSound.play();
      }
      setResult(backResult);
      setShowNext(true);
    });

    init();
  }, [segments]);


  return (
    <View style={styles.container}>
      <Display mode={mode} character={character!} result={result} lang={lang} readingMode={readingMode} />
      <View style={styles.bottom}>
        <Writepad parent={socketID}/> 
        <Result result={result}/>
        <Testbar current={current} characters={characters} showNext={showNext} onNext={() => handleNext()}/>
      </View>
    </View>
  )}

const styles: any = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: backgroundColor,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10
  },
  text: {
    color: '#fff'
  },
  bottom: {
    position: 'relative',
    height: '55%',
    width: '100%',
    overflow: 'hidden',
    flexDirection: 'column',
    gap: 10,
    borderRadius: 10
  }
})
