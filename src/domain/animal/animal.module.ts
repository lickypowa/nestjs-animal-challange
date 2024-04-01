import { Module } from '@nestjs/common';
import { AnimalController } from './animal.controller';
import { AnimalService } from './animal.service';
import { AnimalRepository } from './animal.repository';
import { PrismaModule } from '../../prisma/prisma.module';
import { AnimalInfoService } from './animal.service.info';

@Module({
  imports: [PrismaModule],
  controllers: [AnimalController],
  providers: [AnimalService, AnimalRepository, AnimalInfoService],
})
export class AnimalModule {}
