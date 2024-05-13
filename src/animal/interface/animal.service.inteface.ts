import { Animal } from 'src/shared/domain/animal';
import { IService } from 'src/shared/interface/service.interface';

export interface IAnimalService extends IService<Animal> {
  eat(id: number, additionalWeight: number): Promise<Animal>;
  sleep(id: number, additionalAge: number): Promise<Animal>;
  speak(id: number): Promise<string>;
}
