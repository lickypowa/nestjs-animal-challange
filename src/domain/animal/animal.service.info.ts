import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class AnimalInfoService {
  async getAnimalInfo(name: string): Promise<boolean> {
    try {
      const response = await axios.get(`https://en.wikipedia.org/api/rest_v1/page/summary/${name}`);
      const italianResponse = await axios.get(`https://it.wikipedia.org/api/rest_v1/page/summary/${name}`);
      return !!response.data || !!italianResponse.data;
    } catch (error) {
      return false;
    }
  }
}
