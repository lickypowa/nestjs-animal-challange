import { conditionalMapping } from 'src/utils/mapping.utility';
import { Animal } from '../entity/animal.model';
import { MutateAnimalDto } from '../dto/mutate.animal.dto';
import { AnimalDto } from '../dto/read.animal.dto';

export const fromAnimalMutateDtoToModel = (arg: MutateAnimalDto): Animal => ({
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
