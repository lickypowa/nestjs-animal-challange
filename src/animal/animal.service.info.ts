import { Injectable } from '@nestjs/common';
import axios from 'axios';

/**
 * Service for retrieving animal information from Wikipedia.
 *
 * @remarks
 * This service provides methods to fetch information about animals from Wikipedia pages.
 */
@Injectable()
export class AnimalInfoService {
  /**
   * Retrieves information about an animal from Wikipedia in English and Italian languages.
   *
   * @param name - The name of the animal to fetch information about.
   * @returns A Promise that resolves to a boolean indicating whether information is found for the specified animal.
   */
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
