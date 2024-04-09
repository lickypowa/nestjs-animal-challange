import { Animal } from 'src/shared/domain/animal';
import { IRepository } from 'src/shared/interface/repository.interface';

export interface IAnimalRepository extends IRepository<Animal> {}
