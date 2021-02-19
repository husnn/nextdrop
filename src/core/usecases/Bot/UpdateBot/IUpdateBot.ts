import Bot from '@core/entities/Bot';

export default interface IUpdateBot {
  execute(bot: Bot): Promise<void>;
}