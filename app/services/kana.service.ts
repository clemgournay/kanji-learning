import { Kana } from '@models/kana';
import { API_URL, GetOptions } from '@utils/backend';

export class KanaService {

  apiURL: string;

  constructor() {
    this.apiURL = `${API_URL}/kanas`;
  }

  async getAll(page: number = 1, limit: number = -1, random: boolean = false): Promise<Kana[]> {
    const resp = await fetch(`${this.apiURL}?page=${page}&limit=${limit}&random=${random}`, GetOptions());
    const json = await resp.json();
    return json.data;
  }

  async getByType(type: string, category: string = '', page: number = 1, limit: number = -1, random: boolean = false): Promise<Kana[]> {
    const resp = await fetch(`${this.apiURL}/${type}?category=${category}&page=${page}&limit=${limit}&random=${random}`, GetOptions());
    const json = await resp.json();
    return json.data;
  }

}