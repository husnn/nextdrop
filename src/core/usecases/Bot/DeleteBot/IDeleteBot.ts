export default interface IDeleteBot {
  execute(id: string): Promise<void>;
}