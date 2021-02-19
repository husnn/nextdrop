import Bot from '@core/entities/Bot';
import IGetAllBotsOutput from './IGetAllBotsOutput';

export default class GetAllBotsPresenter implements IGetAllBotsOutput {
  bots: Bot[] = [];

  ok(bots: Bot[]): void { this.bots = bots }
}