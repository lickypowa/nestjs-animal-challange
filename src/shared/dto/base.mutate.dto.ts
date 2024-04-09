import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional } from 'class-validator';

export class BaseDto {
  @ApiProperty({ required: false, description: 'ID of the animal' })
  @IsNumber()
  @IsOptional()
  id?: number;
}
