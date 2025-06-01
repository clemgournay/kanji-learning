export class KanjiReading {
  type: string;
  romaji: string;
  kana: string;
}

export class KanjiMeaning {
  en?: string[]
  fr?: string[];
}
  
export class Kanji {
  _id: string;
  symbol: string;
  meanings: KanjiMeaning;
  readings: KanjiReading[];
  level: string;
}