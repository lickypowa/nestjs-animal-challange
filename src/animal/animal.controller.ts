import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UnprocessableEntityException,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiConsumes,
  ApiCreatedResponse,
  ApiOperation,
  ApiParam,
  ApiProduces,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AnimalService } from './animal.service';
import { fromAnimalModelToDto, fromAnimalMutateDtoToModel, fromAnimalsModelToDtos } from '../mappers/animal.mapper';
import { AnimalDto } from 'src/dto/read.animal.dto';
import { IncreaseAgeDto, IncreaseWeightDto, MutateAnimalDto } from 'src/dto/mutate.animal.dto';
import { ANIMALS_API, APPLICATION_JSON_MEDIA_TYPE } from 'src/utils/constants';

@ApiBearerAuth()
@ApiTags(ANIMALS_API)
@Controller(ANIMALS_API)
export class AnimalController {
  constructor(private service: AnimalService) {}

  @Get()
  @ApiResponse({ description: 'Retrieved list of animals successfully.', type: AnimalDto, isArray: true })
  async getAllAnimal(): Promise<AnimalDto[]> {
    return await this.service.getAll().then((result) => fromAnimalsModelToDtos(result));
  }

  @Get(':id')
  @ApiParam({ name: 'id', description: 'ID of the animal' })
  @ApiResponse({ description: 'Retrieved animal successfully.', type: AnimalDto })
  async getAnimalById(@Param('id') id: number): Promise<AnimalDto> {
    const value = await this.service.get(id);
    return fromAnimalModelToDto(value);
  }

  @ApiOperation({ summary: 'Create new animal resource' })
  @ApiConsumes(APPLICATION_JSON_MEDIA_TYPE)
  @ApiProduces(APPLICATION_JSON_MEDIA_TYPE)
  @ApiCreatedResponse({ status: 201, description: 'Animal created', type: AnimalDto })
  @ApiBadRequestResponse({
    status: 400,
    description: 'Request validation failed',
  })
  @Post()
  @UsePipes(ValidationPipe)
  async createAnimal(@Body() data: MutateAnimalDto): Promise<AnimalDto> {
    return await this.service.create(fromAnimalMutateDtoToModel(data)).then((value) => fromAnimalModelToDto(value));
  }

  @Put(':id')
  @ApiParam({ name: 'id', description: 'ID of the animal' })
  @ApiResponse({ description: 'Animal updated successfully.', type: AnimalDto })
  @ApiBadRequestResponse({ description: 'Invalid data provided.' })
  @UsePipes(ValidationPipe)
  async updateAnimal(@Param('id') id: number, @Body() data: MutateAnimalDto): Promise<AnimalDto> {
    if (data.id === undefined) {
      throw new UnprocessableEntityException("Animal's id is required");
    }
    return await this.service.update(id, fromAnimalMutateDtoToModel(data)).then((value) => fromAnimalModelToDto(value));
  }

  @Delete(':id')
  @ApiParam({ name: 'id', description: 'ID of the animal' })
  @ApiResponse({ status: 204, description: 'Animal deleted successfully.' })
  async deleteAnimal(@Param('id') id: number): Promise<void> {
    this.service.delete(id);
  }

  @Put(':id/sleep')
  @ApiParam({ name: 'id', description: 'ID of the animal' })
  @ApiResponse({ status: 200, description: 'Animal slept successfully.', type: AnimalDto })
  async sleep(@Param('id') id: number, @Body() data: IncreaseAgeDto): Promise<AnimalDto> {
    return await this.service.sleep(id, data.age).then((value) => fromAnimalModelToDto(value));
  }

  @Put(':id/eat')
  @ApiParam({ name: 'id', description: 'ID of the animal' })
  @ApiResponse({ description: 'Animal ate successfully.', type: AnimalDto })
  async eat(@Param('id') id: number, @Body() data: IncreaseWeightDto): Promise<AnimalDto> {
    return await this.service.eat(id, data.weight).then((value) => fromAnimalModelToDto(value));
  }

  @Get(':id/speak')
  @ApiParam({ name: 'id', description: 'ID of the animal' })
  @ApiResponse({ description: 'Animal spoke successfully.', type: String })
  async speak(@Param('id') id: number): Promise<String> {
    return await this.service.speak(id);
  }
}
