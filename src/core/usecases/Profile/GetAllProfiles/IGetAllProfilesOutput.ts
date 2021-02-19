import Profile from '@core/entities/Profile';

export default interface IGetAllProfilesOutput {
  profiles: Profile[];
  
  ok(profiles: Profile[]): void;
}