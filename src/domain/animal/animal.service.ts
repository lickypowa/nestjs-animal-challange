import { Injectable } from '@nestjs/common';
import { AnimalRepository } from './animal.repository';
import { Animal as AnimalModel } from './entity/animal.model';
import { AnimalInfoService } from './animal.service.info';
import { NotFoundException } from 'src/exceptions/not.found.error';

@Injectable()
export class AnimalService {
  constructor(
    private repository: AnimalRepository,
    private animalServiceInfo: AnimalInfoService,
  ) {}

  async getAllAnimal(): Promise<AnimalModel[]> {
    return await this.repository.getAllAnimal();
  }

  getAnimalById(id: number): Promise<AnimalModel> {
    return this.repository.getAnimalById(id);
  }

  async createAnimal(data: AnimalModel): Promise<AnimalModel> {
    if (await this.animalServiceInfo.getAnimalInfo(data.type)) {
      return this.repository.createAnimal(data);
    } else throw new NotFoundException('Animal type not exist, please insert a new one');
  }

  async updateAnimal(id: number, entity: AnimalModel): Promise<AnimalModel> {
    if (await this.animalServiceInfo.getAnimalInfo(entity.type)) {
      return this.repository.updateAnimal(id, entity);
    } else throw new NotFoundException('Animal type not exist, please insert a new one');
  }

  deleteAnimal(id: number) {
    this.repository.deleteAnimal(id);
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
