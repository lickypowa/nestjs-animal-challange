import { Body, Controller, Delete, Get, Inject, Param, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOperation,
  ApiParam,
  ApiProduces,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ANIMALS_API, APPLICATION_JSON_MEDIA_TYPE } from 'src/shared/constants';
import { fromAnimalsModelToDtos, fromAnimalModelToDto, fromAnimalRestToModel } from 'src/shared/mapper/animal.mapper';
import { AnimalDto } from 'src/shared/dto/animal/animal.dto';
import { AnimalCreateDto } from 'src/shared/dto/animal/create-animal-dto';
import { IAnimalService } from './interface/animal.service.inteface';
import { MimeTypes } from 'src/shared/decorators/mime-types-decorator';
import { AnimalUpdateDto } from 'src/shared/dto/animal/update-animal-dto';
import { ANIMAL_SERVICE_KEY } from './animal-providers/animal-service.provider';
import { IncreaseWeightDto } from 'src/shared/dto/animal/increase-weight.dto';
import { IncreaseAgeDto } from 'src/shared/dto/animal/increase-age.dto';

@ApiBearerAuth()
@ApiTags(ANIMALS_API)
@Controller(ANIMALS_API)
export class AnimalController {
  constructor(@Inject(ANIMAL_SERVICE_KEY) private service: IAnimalService) {}

  @Get()
  @ApiOperation({ summary: 'Get all animals' })
  @ApiResponse({ description: 'Retrieved list of animals successfully.', type: AnimalDto, isArray: true })
  @ApiProduces(APPLICATION_JSON_MEDIA_TYPE)
  async getAllAnimal(): Promise<AnimalDto[]> {
    const animalsFound = await this.service.getAll();
    return fromAnimalsModelToDtos(animalsFound);
  }

  @Get(':id')
  @ApiParam({ name: 'id', description: 'ID of the animal' })
  @ApiOperation({ summary: 'Get animal by ID' })
  @ApiResponse({ description: 'Retrieved animal successfully.', type: AnimalDto })
  @ApiProduces(APPLICATION_JSON_MEDIA_TYPE)
  @ApiBadRequestResponse({ status: 404, description: 'Animal not found' })
  async getAnimalById(@Param('id') id: number): Promise<AnimalDto> {
    const animalFound = await this.service.get(id);
    return fromAnimalModelToDto(animalFound);
  }

  @ApiOperation({ summary: 'Create new animal resource' })
  @MimeTypes(APPLICATION_JSON_MEDIA_TYPE)
  @ApiCreatedResponse({ status: 201, description: 'Animal created', type: AnimalDto })
  @ApiBadRequestResponse({ description: 'Request validation failed' })
  @Post()
  @UsePipes(ValidationPipe)
  async createAnimal(@Body() data: AnimalCreateDto): Promise<AnimalDto> {
    const createdAnimal = await this.service.create(fromAnimalRestToModel(data));
    return fromAnimalModelToDto(createdAnimal);
  }

  @Put(':id')
  @ApiParam({ name: 'id', description: 'ID of the animal' })
  @MimeTypes(APPLICATION_JSON_MEDIA_TYPE)
  @ApiResponse({ status: 200, description: 'Animal updated successfully.', type: AnimalDto })
  @ApiBadRequestResponse({ description: 'Invalid data provided.' })
  @ApiOperation({ summary: 'Update animal by ID' })
  @UsePipes(ValidationPipe)
  async updateAnimal(@Param('id') id: number, @Body() data: AnimalUpdateDto): Promise<AnimalDto> {
    const updatedAnimal = await this.service.update(id, fromAnimalRestToModel(data));
    return fromAnimalModelToDto(updatedAnimal);
  }

  @Delete(':id')
  @ApiParam({ name: 'id', description: 'ID of the animal' })
  @ApiResponse({ status: 204, description: 'Animal deleted successfully.' })
  @ApiBadRequestResponse({ status: 404, description: 'Animal not found' })
  @ApiOperation({ summary: 'Delete animal by ID' })
  async deleteAnimal(@Param('id') id: number): Promise<void> {
    this.service.delete(id);
  }

  @Put(':id/sleep')
  @ApiParam({ name: 'id', description: 'ID of the animal' })
  @ApiResponse({ status: 200, description: 'Animal slept successfully.', type: AnimalDto })
  @MimeTypes(APPLICATION_JSON_MEDIA_TYPE)
  @ApiBadRequestResponse({ status: 404, description: 'Animal not found' })
  @ApiOperation({ summary: 'Put animal to sleep' })
  async sleep(@Param('id') id: number, @Body() data: IncreaseAgeDto): Promise<AnimalDto> {
    const animalStatus = await this.service.sleep(id, data.age);
    return fromAnimalModelToDto(animalStatus);
  }

  @Put(':id/eat')
  @ApiParam({ name: 'id', description: 'ID of the animal' })
  @ApiResponse({ status: 200, description: 'Animal ate successfully.', type: AnimalDto })
  @MimeTypes(APPLICATION_JSON_MEDIA_TYPE)
  @ApiBadRequestResponse({ status: 404, description: 'Animal not found' })
  @ApiOperation({ summary: 'Put animal to eat' })
  async eat(@Param('id') id: number, @Body() data: IncreaseWeightDto): Promise<AnimalDto> {
    const updatedAnimal = await this.service.eat(id, data.weight);
    return fromAnimalModelToDto(updatedAnimal);
  }

  @Get(':id/speak')
  @ApiParam({ name: 'id', description: 'ID of the animal' })
  @ApiResponse({ status: 200, description: 'Animal spoke successfully.', type: String })
  @ApiBadRequestResponse({ status: 404, description: 'Animal not found' })
  @ApiOperation({ summary: 'Make animal speak' })
  speak(@Param('id') id: number): Promise<String> {
    return this.service.speak(id);
  }
}
