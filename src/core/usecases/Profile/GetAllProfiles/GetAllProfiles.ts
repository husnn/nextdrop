import IProfileRepository from '@core/repositories/IProfileRepository';
import GetAllProfilesPresenter from './GetAllProfilesPresenter';
import IGetAllProfiles from './IGetAllProfiles';
import IGetAllProfilesOutput from './IGetAllProfilesOutput';

export default class GetAllProfiles implements IGetAllProfiles {
  profileRepository: IProfileRepository;
  outputPort: IGetAllProfilesOutput;

  constructor(profileRepository: IProfileRepository) {
    this.profileRepository = profileRepository;
    this.outputPort = new GetAllProfilesPresenter();
  }

  async execute(): Promise<void> {
    const profiles = await this.profileRepository.getAll();
    this.outputPort.ok(profiles);
  }
}