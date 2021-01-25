export default interface IWrite<T> {
  create(data: any): Promise<T | undefined>;
  update(data: any): Promise<T | undefined>;
  remove(id: string): Promise<void>;
}