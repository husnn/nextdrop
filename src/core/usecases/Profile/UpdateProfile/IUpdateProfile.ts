import Profile from '@core/entities/Profile';

export default interface IUpdateProfile {
  execute(profile: Profile): Promise<void>;
}