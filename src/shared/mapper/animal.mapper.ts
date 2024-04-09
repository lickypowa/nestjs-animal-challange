import { AnimalDto } from 'dist/dto/read.animal.dto';
import { Animal } from '../domain/animal';

export const fromAnimalMutateDtoToModel = (arg: AnimalDto): Animal => ({
  id: arg.id,
  name: arg.name,
  type: arg.type,
  species: arg.species,
  age: arg.age,
  gender: arg?.gender,
  weight: arg?.weight,
  verse: arg?.verse,
});

export const fromAnimalsModelToDtos = (args: Animal[]): AnimalDto[] => args.map(fromAnimalModelToDto);

export const fromAnimalModelToDto = (arg: Animal): AnimalDto => ({
  id: arg.id,
  name: arg.name,
  type: arg.type,
  species: arg.species,
  age: arg.age,
  gender: arg?.gender,
  weight: arg?.weight,
  verse: arg?.verse,
});
