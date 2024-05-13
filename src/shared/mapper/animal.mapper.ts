import { Animal } from '../domain/animal';
import { AnimalDto } from '../dto/animal/animal.dto';

export const fromAnimalRestToModel = (arg: AnimalDto): Animal => ({
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
