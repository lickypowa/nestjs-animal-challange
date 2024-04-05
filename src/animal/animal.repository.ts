import { NotFoundException } from 'src/errors/not.found.error';
import { PrismaService } from '../prisma/prisma.service';
import { Animal as AnimalModel } from '../entity/animal';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AnimalRepository {
  constructor(private dao: PrismaService) {}

  async getAllAnimal(): Promise<AnimalModel[]> {
    return await this.dao.animal.findMany();
  }

  async getAnimalById(id: number): Promise<AnimalModel> {
    return await this.dao.animal.findUniqueOrThrow({ where: { id: Number(id) } }).catch(() => {
      throw new NotFoundException('Animal not found');
    });
  }

  async createAnimal(data: AnimalModel) {
    return await this.dao.animal.create({
      data,
    });
  }

  async updateAnimal(id: number, data: AnimalModel): Promise<AnimalModel> {
    return await this.dao.animal
      .update({
        where: { id: Number(id) },
        data: {
          ...data,
          id: Number(id),
        },
      })
      .catch(() => {
        throw new NotFoundException('Animal not found');
      });
  }

  async deleteAnimal(id: number) {
    await this.dao.animal.delete({ where: { id: Number(id) } });
  }
}
