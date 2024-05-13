import { PrismaService } from '../../shared/prisma/prisma.service';
import { Inject, Injectable } from '@nestjs/common';
import { IAnimalRepository } from './interface/animal.repository.interface';
import { PRISMA_SERVICE_KEY } from 'src/shared/prisma/prisma.providers';
import { NotFoundException } from 'src/shared/errors/entity-not-found.error';
import { Animal } from 'src/shared/domain/animal';

@Injectable()
export class AnimalRepository implements IAnimalRepository {
  constructor(@Inject(PRISMA_SERVICE_KEY) private prismaService: PrismaService) {}
  /**
   *
   * @returns
   */
  getAll(): Promise<Animal[]> {
    return this.prismaService.findMany();
  }

  /**
   *
   * @param id
   * @returns
   */
  get(id: number): Promise<Animal> {
    return this.prismaService.findUniqueOrThrow({ where: { id: Number(id) } }).catch(() => {
      throw new NotFoundException();
    });
  }

  /**
   *
   * @param data
   * @returns
   */
  create(data: Animal): Promise<Animal> {
    return this.prismaService.create({
      data,
    });
  }

  /**
   *
   * @param id
   * @param data
   * @returns
   */
  update(id: number, data: Animal): Promise<Animal> {
    return this.prismaService
      .update({
        where: { id: Number(id) },
        data: {
          ...data,
          id: Number(id),
        },
      })
      .catch(() => {
        throw new NotFoundException();
      });
  }

  /**
   *
   * @param id
   */
  async delete(id: number) {
    this.prismaService.delete({ where: { id: Number(id) } });
  }
}
