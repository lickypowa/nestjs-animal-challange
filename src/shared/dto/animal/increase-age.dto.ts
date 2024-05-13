import { PickType } from '@nestjs/swagger';
import { AnimalDto } from './animal.dto';

export class IncreaseAgeDto extends PickType(AnimalDto, ['age'] as const) {}
