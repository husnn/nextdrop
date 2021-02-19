import IDeleteProfile from './IDeleteProfile';
import IProfileRepository from '@core/repositories/IProfileRepository';

export default class DeleteProfile implements IDeleteProfile {
  profileRepository: IProfileRepository;
  
  constructor(profileRepository: IProfileRepository) {
    this.profileRepository = profileRepository;
  }

  async execute(id: string): Promise<void> {
    await this.profileRepository.remove(id);
  }
}