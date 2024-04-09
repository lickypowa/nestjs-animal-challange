import { Inject, Injectable, Logger } from '@nestjs/common';
import { Animal } from '../shared/domain/animal';
import axios from 'axios';
import { UnprocessableEntity } from 'src/shared/errors/unprocessable-entity.error';
import { IAnimalService } from './interface/animal.service.inteface';
import { IAnimalRepository } from 'src/database/animal/interface/animal.repository.interface';
import { ANIMAL_REPOSITORY_KEY } from './animal.providers';

@Injectable()
export class AnimalService implements IAnimalService {
  logger = new Logger('NestApplication');
  constructor(@Inject(ANIMAL_REPOSITORY_KEY) private repository: IAnimalRepository) {}

  /**
   * Simulates an animal sleeping by updating its age asynchronously.
   *
   * @param id - The identifier of the animal in the repository.
   * @param additionalAge - The additional age to be added to the current age of the animal.
   * @returns A Promise that resolves to the updated Animal after the age is updated.
   */
  async sleep(id: number, additionalAge: number): Promise<Animal> {
    const foundAnimal = await this.repository.get(id);

    return this.repository.update(id, {
      ...foundAnimal,
      age: foundAnimal.age + additionalAge,
    });
  }

  /**
   * Simulates an animal eating by updating its weight asynchronously.
   *
   * @param id - The identifier of the animal in the repository.
   * @param additionalWeight - The additional weight to be added to the current weight of the animal.
   * @returns A Promise that resolves to the updated Animal after the weight is updated.
   */
  async eat(id: number, additionalWeight: number): Promise<Animal> {
    const foundAnimal = await this.repository.get(id);

    return this.repository.update(id, {
      ...foundAnimal,
      weight: foundAnimal.weight + additionalWeight,
    });
  }

  /**
   * Retrieves the vocalization of an animal from the repository.
   *
   * @param id - The identifier of the animal in the repository.
   * @returns A Promise that resolves to a string representing the vocalization of the animal.
   */
  async speak(id: number): Promise<String> {
    const foundAnimal = await this.repository.get(id);
    return `The ${foundAnimal.species} goes ${foundAnimal.verse}`;
  }

  /**
   *
   * @returns
   */
  async getAll(): Promise<Animal[]> {
    return await this.repository.getAll();
  }

  /**
   *
   * @param id
   * @returns
   */
  async get(id: number): Promise<Animal> {
    return await this.repository.get(id);
  }

  /**
   *
   * @param data
   * @returns
   */
  async create(data: Animal): Promise<Animal> {
    const existByName = await this.getAnimalInfo(data.type);
    if (existByName) {
      return this.repository.create(data);
    } else {
      this.logger.error("Cannot create or update the animal inserted 'cause it doesn't exist");
      throw new UnprocessableEntity();
    }
  }

  /**
   *
   * @param id
   * @param entity
   * @returns
   */
  async update(id: number, entity: Animal): Promise<Animal> {
    const existByName = await this.getAnimalInfo(entity.type);
    if (existByName) {
      return this.repository.update(id, entity);
    } else throw new UnprocessableEntity();
  }

  /**
   *
   * @param id
   * @returns
   */
  delete(id: number): Promise<void> {
    return this.repository.delete(id);
  }

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
