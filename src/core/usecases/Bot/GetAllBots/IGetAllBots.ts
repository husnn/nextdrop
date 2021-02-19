import IGetAllBotsOutput from './IGetAllBotsOutput';

export default interface IGetAllBots {
  execute(): Promise<void>;
  setOutputPort(port: IGetAllBotsOutput): void;
}