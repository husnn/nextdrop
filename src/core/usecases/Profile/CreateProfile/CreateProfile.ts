import ICreateProfile from './ICreateProfile';
import CreateProfileRequest from './CreateProfileRequest';
import IProfileRepository from '@core/repositories/IProfileRepository';

export default class CreateProfile implements ICreateProfile {
  profileRepository: IProfileRepository;
  
  constructor(profileRepository: IProfileRepository) {
    this.profileRepository = profileRepository;
  }

  async execute(props: CreateProfileRequest): Promise<void> {
    await this.profileRepository.create(props);
  }
}