import IUpdateBot from './IUpdateBot';
import IBotRepository from '@core/repositories/IBotRepository';
import Bot from '@core/entities/Bot';

export default class UpdateBot implements IUpdateBot {
  botRepository: IBotRepository;
  
  constructor(botRepository: IBotRepository) {
    this.botRepository = botRepository;
  }

  async execute(bot: Bot): Promise<void> {
    await this.botRepository.update(bot);
  }
}