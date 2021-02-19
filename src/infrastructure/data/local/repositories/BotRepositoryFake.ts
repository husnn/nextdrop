import path from 'path';
import Datastore from 'nedb-promises';
import Bot from '@core/entities/Bot';
import IBotRepository from '@core/repositories/IBotRepository';
import BotMapper from '../mappers/BotMapper';

export default class BotRepositoryFake implements IBotRepository {
  db: Datastore;

  constructor() {
    this.db = Datastore.create(path.resolve(__dirname, "../db/fake/bots.db"));
  }

  async create(data: any): Promise<void> {
    await this.db.insert(data);
  }

  async getAll(): Promise<Bot[]> {
    const bots: Bot[] = [];

    const query = await this.db.find({});

    for await (const record of query) {
      bots.push(BotMapper.toEntity(record));
    }

    return bots;
  }

  async update(bot: Bot): Promise<Bot> {
    const { id, ...data } = bot;
    
    const updated = await this.db.update(
      { _id: id },
      { ...data },
      { multi: false, returnUpdatedDocs: true }
    );

    return BotMapper.toEntity(updated);
  }

  async remove(id: string): Promise<void> {
    await this.db.remove({ _id: id }, {}); 
  }
}
