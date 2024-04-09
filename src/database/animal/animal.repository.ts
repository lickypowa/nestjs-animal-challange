import { PrismaService } from '../../shared/prisma/prisma.service';
import { Inject, Injectable } from '@nestjs/common';
import { IAnimalRepository } from './interface/animal.repository.interface';
import { AbstractPrismaRepository } from '../abstract.repository';
import { Animal } from 'src/shared/domain/animal';
import { ANIMAL_KEY, PRISMA_SERVICE_KEY } from 'src/shared/prisma/prisma.providers';

@Injectable()
export class AnimalRepository extends AbstractPrismaRepository<Animal> implements IAnimalRepository {
  constructor(@Inject(PRISMA_SERVICE_KEY) ORM: PrismaService) {
    super(ORM, ANIMAL_KEY);
  }
}
