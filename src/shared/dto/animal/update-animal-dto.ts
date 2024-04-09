import { ApiProperty, PickType } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';
import { AnimalCreateDto } from './create-animal-dto';

export class AnimalUpdateDto extends AnimalCreateDto {
  @ApiProperty({ required: false, description: 'ID of the animal' })
  @IsString()
  @IsNotEmpty()
  id!: number;
}

export class AnimalIncreseWeightDto extends PickType(AnimalCreateDto, ['weight'] as const) {}

export class AnimalIncreseAgeDto extends PickType(AnimalCreateDto, ['age'] as const) {}
