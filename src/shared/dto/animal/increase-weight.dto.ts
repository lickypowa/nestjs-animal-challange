import { PickType } from '@nestjs/swagger';
import { AnimalDto } from './animal.dto';

export class IncreaseWeightDto extends PickType(AnimalDto, ['weight'] as const) {}
