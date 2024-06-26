export interface IService<T, K> {
  create(entity: T): Promise<T>;
  update(id: number, entity: T): Promise<T>;
  delete(id: number): Promise<void>;
  get(id: number): Promise<T>;
  getAll(): Promise<T[]>;
}
