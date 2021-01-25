import Bot from '@core/entities/Bot';
import IRead from './IRead';
import IWrite from './IWrite';

export default interface IBotRepository extends IRead<Bot>, IWrite<Bot> {}