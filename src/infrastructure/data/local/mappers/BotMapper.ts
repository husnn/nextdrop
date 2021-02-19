import Bot from '@core/entities/Bot';

export default class BotMapper {
  static toEntity({ _id, ...data }: any) {
    return new Bot({ id: _id, ...data });
  }
}