import IBotRepository from '@core/repositories/IBotRepository';
import GetAllBotsPresenter from './GetAllBotsPresenter';
import IGetAllBots from './IGetAllBots';
import IGetAllBotsOutput from './IGetAllBotsOutput';

export default class GetAllBots implements IGetAllBots {
  botRepository: IBotRepository;
  outputPort: IGetAllBotsOutput;

  constructor(botRepository: IBotRepository) {
    this.botRepository = botRepository;
    this.outputPort = new GetAllBotsPresenter();
  }

  async execute(): Promise<void> {
    const bots = await this.botRepository.getAll();
    this.outputPort.ok(bots);
  }

  setOutputPort(port: IGetAllBotsOutput): void {
    this.outputPort = port;
  }
}