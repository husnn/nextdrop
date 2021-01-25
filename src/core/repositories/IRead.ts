export default interface IRead<T> {
  getAll(): Promise<T[]>;
  get(id: string): Promise<T | undefined>;
  findOne(query: any): Promise<T | undefined>
}