import { Prisma } from '@prisma/client';

export class Animal implements Prisma.AnimalCreateInput {
  readonly id?: number;
  readonly name!: string;
  readonly type!: string;
  readonly species!: string;
  readonly age!: number;
  readonly gender!: string;
  readonly weight!: number;
  readonly verse!: string;
}
