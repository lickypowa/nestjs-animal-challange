import { Module } from '@nestjs/common';
import { AnimalController } from './animal.controller';
import { AnimalService } from './animal.service';
import { DatabaseModule } from 'src/database/database.module';
import { AnimalRepository } from 'src/database/animal/animal.repository';
import { PrismaService } from 'src/shared/prisma/prisma.service';
import { ANIMAL_REPOSITORY_KEY, ANIMAL_SERVICE_KEY } from './animal.providers';
import { PRISMA_SERVICE_KEY } from 'src/shared/prisma/prisma.providers';

@Module({
  controllers: [AnimalController],
  imports: [DatabaseModule],
  providers: [
    {
      provide: ANIMAL_SERVICE_KEY,
      useClass: AnimalService,
    },
    {
      provide: ANIMAL_REPOSITORY_KEY,
      useClass: AnimalRepository,
    },
    {
      provide: PRISMA_SERVICE_KEY,
      useClass: PrismaService,
    },
  ],
})
export class AnimalModule {}
