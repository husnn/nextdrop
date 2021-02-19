import Bot from '@core/entities/Bot';

export default interface IBotRepository {
  create(data: any): Promise<void>;
  getAll(): Promise<Bot[]>;
  update(bot: Bot): Promise<Bot>;
  remove(id: string): Promise<void>;
}