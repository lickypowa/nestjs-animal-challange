import { NotFoundException } from 'src/errors/not.found.error';
import { PrismaService } from '../prisma/prisma.service';
import { Animal as AnimalModel } from '../entity/animal';
import { Injectable } from '@nestjs/common';
import { IRepository } from 'src/shared/interfaces/repository.interfaces';

@Injectable()
export class AnimalRepository implements IRepository<AnimalModel, AnimalModel> {
  constructor(private dao: PrismaService) {}

  /**
   *
   * @returns
   */
  async getAll(): Promise<AnimalModel[]> {
    return await this.dao.animal.findMany();
  }

  /**
   *
   * @param id
   * @returns
   */
  async get(id: number): Promise<AnimalModel> {
    return await this.dao.animal.findUniqueOrThrow({ where: { id: Number(id) } }).catch(() => {
      throw new NotFoundException('Animal not found');
    });
  }

  /**
   *
   * @param data
   * @returns
   */
  async create(data: AnimalModel) {
    return await this.dao.animal.create({
      data,
    });
  }

  /**
   *
   * @param id
   * @param data
   * @returns
   */
  async update(id: number, data: AnimalModel): Promise<AnimalModel> {
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

  /**
   *
   * @param id
   */
  async delete(id: number) {
    await this.dao.animal.delete({ where: { id: Number(id) } });
  }
}
