import Profile from '@core/entities/Profile';
import IRead from './IRead';
import IWrite from './IWrite';

export default interface IProfileRepository extends IRead<Profile>, IWrite<Profile> {}