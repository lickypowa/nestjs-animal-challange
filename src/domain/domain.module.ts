import { Module } from '@nestjs/common';
import { AnimalModule } from './animal/animal.module';
@Module({
  imports: [AnimalModule],
  providers: [],
})
export class DomainModule {}
