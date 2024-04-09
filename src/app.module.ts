import { Module } from '@nestjs/common';
import { AnimalModule } from './animals/animals.module';

@Module({
  imports: [AnimalModule],
})
export class AppModule {}
