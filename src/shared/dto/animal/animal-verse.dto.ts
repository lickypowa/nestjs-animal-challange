import { PickType } from '@nestjs/swagger';
import { AnimalDto } from './animal.dto';

export class AnimalVerseDto extends PickType(AnimalDto, ['verse'] as const) {}
