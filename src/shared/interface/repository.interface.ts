export interface IRepository<T> {
  create(data: T): Promise<T>;
  update(id: number, data: T): Promise<T>;
  delete(id: number): Promise<void>;
  get(id: number): Promise<T>;
  getAll(): Promise<T[]>;
}
