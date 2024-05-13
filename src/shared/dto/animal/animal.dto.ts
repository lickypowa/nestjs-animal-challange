import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { BaseDto } from '../base.mutate.dto';

export class AnimalDto extends BaseDto {
  @ApiProperty({ description: 'Name of the animal' })
  @IsString()
  @IsNotEmpty()
  name!: string;

  @ApiProperty({ description: 'Type of the animal' })
  @IsString()
  @IsNotEmpty()
  type!: string;

  @ApiProperty({ description: 'Species of the animal' })
  @IsString()
  @IsNotEmpty()
  species!: string;

  @ApiProperty({ description: 'Age of the animal' })
  @IsNumber()
  @IsNotEmpty()
  age!: number;

  @ApiProperty({ description: 'Gender of the animal' })
  @IsNotEmpty()
  @IsString()
  gender!: string;

  @ApiProperty({ description: 'Weight of the animal' })
  @IsNotEmpty()
  @IsNumber()
  weight!: number;

  @ApiProperty({ description: 'Verse of the animal' })
  @IsNotEmpty()
  @IsString()
  verse!: string;
}
