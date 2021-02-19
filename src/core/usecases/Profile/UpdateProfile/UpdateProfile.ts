import IUpdateProfile from './IUpdateProfile';
import IProfileRepository from '@core/repositories/IProfileRepository';
import Profile from '@core/entities/Profile';

export default class UpdateProfile implements IUpdateProfile {
  profileRepository: IProfileRepository;
  
  constructor(profileRepository: IProfileRepository) {
    this.profileRepository = profileRepository;
  }

  async execute(profile: Profile): Promise<void> {
    await this.profileRepository.update(profile);
  }
}