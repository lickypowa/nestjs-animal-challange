import { Animal } from '@prisma/client';
import { NotFoundException } from 'src/shared/errors/entity-not-found.error';
import { PrismaService } from 'src/shared/prisma/prisma.service';

export abstract class AbstractPrismaRepository<T> {
  private table: string;
  private ORM: PrismaService;
  constructor(ORM: PrismaService, table: string) {
    this.table = table;
    this.ORM = ORM;
  }

  /**
   *
   * @returns
   */
  getAll(): Promise<any> {
    return this.ORM[this.table].findMany();
  }

  /**
   *
   * @param id
   * @returns
   */
  get(id: number): Promise<T> {
    return this.ORM[this.table].findUniqueOrThrow({ where: { id: Number(id) } }).catch(() => {
      throw new NotFoundException();
    });
  }

  /**
   *
   * @param data
   * @returns
   */
  create(data: T) {
    return this.ORM[this.table].create({
      data,
    });
  }

  /**
   *
   * @param id
   * @param data
   * @returns
   */
  update(id: number, data: T): Promise<T> {
    return this.ORM[this.table]
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
    this.ORM[this.table].animal.delete({ where: { id: Number(id) } });
  }
}
