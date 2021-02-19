import Profile from '@core/entities/Profile';
import IGetAllProfilesOutput from './IGetAllProfilesOutput';

export default class GetAllProfilesPresenter implements IGetAllProfilesOutput {
  profiles: Profile[] = [];

  ok(profiles: Profile[]): void { this.profiles = profiles }
}