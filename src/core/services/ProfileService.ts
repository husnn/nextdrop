import Profile from "@core/entities/Profile";
import IProfileRepository from "@core/repositories/IProfileRepository";

export default class ProfileService {
  profileRepository: IProfileRepository;
  
  constructor(profileRepository: IProfileRepository) {
    this.profileRepository = profileRepository;
  }

  async getAll(): Promise<Profile[]> {
    let bots = await this.profileRepository.getAll();

    return bots;
  }
}