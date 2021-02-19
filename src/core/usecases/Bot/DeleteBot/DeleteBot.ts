import IDeleteBot from './IDeleteBot';
import IBotRepository from '@core/repositories/IBotRepository';

export default class DeleteBot implements IDeleteBot {
  botRepository: IBotRepository;
  
  constructor(botRepository: IBotRepository) {
    this.botRepository = botRepository;
  }

  async execute(id: string): Promise<void> {
    await this.botRepository.remove(id);
  }
}