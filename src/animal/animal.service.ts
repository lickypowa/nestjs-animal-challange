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
   *
   * @returns
   */
  async getAll(): Promise<AnimalModel[]> {
    return await this.repository.getAllAnimal();
  }

  /**
   *
   * @param id
   * @returns
   */
  async get(id: number): Promise<AnimalModel> {
    return await this.repository.getAnimalById(id);
  }

  /**
   *
   * @param data
   * @returns
   */
  async create(data: AnimalModel): Promise<AnimalModel> {
    if (await this.animalServiceInfo.getAnimalInfo(data.type)) {
      return this.repository.createAnimal(data);
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
      return this.repository.updateAnimal(id, entity);
    } else throw new NotFoundException('Animal type not exist, please insert a new one');
  }

  /**
   *
   * @param id
   * @returns
   */
  delete(id: number): Promise<void> {
    return this.repository.deleteAnimal(id);
  }

  /**
   *
   * @param id
   * @param additionalAge
   * @returns Promise<AnimalModel>
   */
  async sleep(id: number, additionalAge: number): Promise<AnimalModel> {
    return this.repository.getAnimalById(id).then((result) => {
      return this.repository.updateAnimal(id, {
        ...result,
        age: result.age + additionalAge,
      });
    });
  }

  /**
   *
   * @param id
   * @param additionalWeight
   * @returns
   */
  async eat(id: number, additionalWeight: number): Promise<AnimalModel> {
    return this.repository.getAnimalById(id).then((result) => {
      return this.repository.updateAnimal(id, {
        ...result,
        weight: result.weight + additionalWeight,
      });
    });
  }

  /**
   *
   * @param id
   * @returns
   */
  async speak(id: number): Promise<String> {
    return this.repository.getAnimalById(id).then((result) => {
      return `The ${result.species} goes ${result.verse}`;
    });
  }
}
