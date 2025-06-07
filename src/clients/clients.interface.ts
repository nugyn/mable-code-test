export interface IDatabaseClient<T> {
  insert(item: T): Promise<void>;
  getAll(): Promise<T[]>;
  getById(id: string): Promise<T | null>;
  update(id: string, update: Partial<T>): Promise<void>;
  delete(id: string): Promise<void>;
}
