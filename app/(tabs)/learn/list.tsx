import { useRoute } from '@react-navigation/native';
import { KanaService } from '@services/kana.service';
import { KanjiService } from '@services/kanji.service';
import { useSegments } from 'expo-router';
import { useEffect, useState } from 'react';
import { SectionList, StyleSheet, Text, View } from 'react-native';
import { backgroundColor } from '../../styles/theme';

export default function List() {

  const route = useRoute();
  const params: any = route.params;
  const segments = useSegments();

  const mode = params['mode'] ? params['mode'] : 'hiragana';
  const level = params['level'] ? params['level'] : 'N5';

  const [sections, setSections] = useState<any[]>(null);

  useEffect(() => {

    const init = async () => {
      console.log(mode);
      if (mode === 'kanji') {
        setSections([]);
        const kanjiService = new KanjiService();
        const list: any[] = await kanjiService.getByLevel(level);
        let sectionsData: any = [];
        let charCount = 0;
        let limit = 10;
        let dayCount = 1;
        let latestSection: any = {title: `Day 1`, key: 'day-1', data: []};
        for (let item of list) {
  
          latestSection.data.push(item);
      
          charCount++;
          if (charCount === limit) {
            charCount = 0;
            dayCount++;
            sectionsData.push(latestSection);
            latestSection = {title: `Day ${dayCount}`, key: `day-${dayCount}`, data: []}
          }
        }
        setSections(sectionsData);
      } else {
        const kanaService = new KanaService();
        const list: any[] = await kanaService.getByType(mode);

        let sectionsData: any = [];
        for (let item of list) {
          const section = sectionsData.find((s: any) => s.key === item.category);
          if (!section) {
            sectionsData.push({title: item.symbol, key: item.category, data: [item]});
          } else {
            section.data.push(item);
          }
        }
        setSections(sectionsData);
        console.log(sections);
      }
    }
    init();
  }, [segments]);
 
  return (
    <View style={styles.container}>
      {sections && (<SectionList
        sections={sections}
        renderItem={({item}) => <Text style={styles.item}>{item.symbol}</Text>}
        renderSectionHeader={({section}) => (
          <Text style={styles.sectionHeader}>{section.title}</Text>
        )}
        keyExtractor={item => `basicListEntry-${item._id}`}
      />)}
    </View>
  )
  
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: backgroundColor,
    gap: 40
  },
  sectionHeader: {
    paddingTop: 2,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 2,
    fontSize: 14,
    width: '100%',
    fontWeight: 'bold',
    color: 'white',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
    color: 'white',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.2)'
  },
})