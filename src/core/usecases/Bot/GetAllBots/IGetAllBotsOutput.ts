import Bot from '@core/entities/Bot';

export default interface IGetAllBotsOutput {
  bots: Bot[];
  
  ok(bots: Bot[]): void;
}