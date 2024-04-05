import { Module } from '@nestjs/common';
import { AnimalModule } from 'dist/domain/animal/animal.module';

@Module({
  imports: [AnimalModule],
})
export class AppModule {}
