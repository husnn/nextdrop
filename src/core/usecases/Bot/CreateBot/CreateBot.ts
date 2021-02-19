import IBotRepository from '@core/repositories/IBotRepository';
import CreateBotPresenter from './CreateBotPresenter';
import CreateBotRequest from './CreateBotRequest';
import ICreateBot from './ICreateBot';
import ICreateBotOutput from './ICreateBotOutput';

export default class CreateBot implements ICreateBot {
  botRepository: IBotRepository;
  outputPort: ICreateBotOutput;
  
  constructor(botRepository: IBotRepository) {
    this.botRepository = botRepository;
    this.outputPort = new CreateBotPresenter();
  }

  async execute(props: CreateBotRequest): Promise<void> {
    await this.botRepository.create(props);
    this.outputPort.ok();
  }
}