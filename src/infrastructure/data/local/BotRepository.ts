import Bot from '@core/entities/Bot';
import IBotRepository from '@core/repositories/IBotRepository';

import { bots } from '@infrastructure/data/mock/bots';

export default class BotRepository implements IBotRepository {
  async getAll(): Promise<Bot[]> {
    return bots;
  }
  get(id: string): Promise<Bot | undefined> {
    throw new Error('Method not implemented.');
  }
  findOne(query: any): Promise<Bot | undefined> {
    throw new Error('Method not implemented.');
  }
  create(item: Bot): Promise<Bot | undefined> {
    throw new Error('Method not implemented.');
  }
  update(item: Bot): Promise<Bot | undefined> {
    throw new Error('Method not implemented.');
  }
  remove(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
}