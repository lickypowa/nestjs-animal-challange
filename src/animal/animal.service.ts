import { Injectable } from '@nestjs/common';
import { AnimalRepository } from './animal.repository';
import { Animal as AnimalModel } from '../entity/animal';
import { AnimalInfoService } from './animal.service.info';
import { NotFoundException } from 'src/errors/not.found.error';
import { IService } from 'src/shared/interfaces/service.interface';

@Injectable()
export class AnimalService implements IService<AnimalModel, AnimalModel> {
  constructor(
    private repository: AnimalRepository,
    private animalServiceInfo: AnimalInfoService,
  ) {}

  /**
   * Simulates an animal sleeping by updating its age asynchronously.
   *
   * @param id - The identifier of the animal in the repository.
   * @param additionalAge - The additional age to be added to the current age of the animal.
   * @returns A Promise that resolves to the updated AnimalModel after the age is updated.
   */
  async sleep(id: number, additionalAge: number): Promise<AnimalModel> {
    return this.repository.get(id).then((result) => {
      return this.repository.update(id, {
        ...result,
        age: result.age + additionalAge,
      });
    });
  }

  /**
   * Simulates an animal eating by updating its weight asynchronously.
   *
   * @param id - The identifier of the animal in the repository.
   * @param additionalWeight - The additional weight to be added to the current weight of the animal.
   * @returns A Promise that resolves to the updated AnimalModel after the weight is updated.
   */
  async eat(id: number, additionalWeight: number): Promise<AnimalModel> {
    return this.repository.get(id).then((result) => {
      return this.repository.update(id, {
        ...result,
        weight: result.weight + additionalWeight,
      });
    });
  }

  /**
   * Retrieves the vocalization of an animal from the repository.
   *
   * @param id - The identifier of the animal in the repository.
   * @returns A Promise that resolves to a string representing the vocalization of the animal.
   */
  async speak(id: number): Promise<String> {
    return this.repository.get(id).then((result) => {
      return `The ${result.species} goes ${result.verse}`;
    });
  }

  /**
   *
   * @returns
   */
  async getAll(): Promise<AnimalModel[]> {
    return await this.repository.getAll();
  }

  /**
   *
   * @param id
   * @returns
   */
  async get(id: number): Promise<AnimalModel> {
    return await this.repository.get(id);
  }

  /**
   *
   * @param data
   * @returns
   */
  async create(data: AnimalModel): Promise<AnimalModel> {
    if (await this.animalServiceInfo.getAnimalInfo(data.type)) {
      return this.repository.create(data);
    } else throw new NotFoundException('Animal type not exist, please insert a new one');
  }

  /**
   *
   * @param id
   * @param entity
   * @returns
   */
  async update(id: number, entity: AnimalModel): Promise<AnimalModel> {
    if (await this.animalServiceInfo.getAnimalInfo(entity.type)) {
      return this.repository.update(id, entity);
    } else throw new NotFoundException('Animal type not exist, please insert a new one');
  }

  /**
   *
   * @param id
   * @returns
   */
  delete(id: number): Promise<void> {
    return this.repository.delete(id);
  }
}
