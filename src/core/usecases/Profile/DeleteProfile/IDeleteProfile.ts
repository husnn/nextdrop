export default interface IDeleteProfile {
  execute(id: string): Promise<void>;
}