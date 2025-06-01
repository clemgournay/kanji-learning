import { Kanji } from '@models/kanji';
import { API_URL, GetOptions } from '@utils/backend';

export class KanjiService {

  apiURL: string;

  constructor() {
    this.apiURL = `${API_URL}/kanjis`;
  }

  async getAll(page: number = 1, limit: number = -1, random: boolean = false): Promise<Kanji[]> {
    const resp = await fetch(`${this.apiURL}?page=${page}&limit=${limit}&random=${random}`, GetOptions());
    const json = await resp.json();
    return json.data;
  }

  async getByLevel(level: string, page: number = 1, limit: number = -1, random: boolean = false): Promise<Kanji[]> {
    const resp = await fetch(`${this.apiURL}/${level}?page=${page}&limit=${limit}&random=${random}`, GetOptions());
    const json = await resp.json();
    return json.data;
  }

}