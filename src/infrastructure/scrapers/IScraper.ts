export default interface IScraper {
  id: string;
  run(): Promise<void>;
  stop(): Promise<void>;
  handleError(error: Error): Promise<void>;
} 