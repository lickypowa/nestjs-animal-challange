import { OmitType } from '@nestjs/swagger';
import { AnimalDto } from './animal.dto';

export class AnimalCreateDto extends OmitType(AnimalDto, ['id'] as const) {}
