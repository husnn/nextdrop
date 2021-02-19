import CreateProfileRequest from './CreateProfileRequest';

export default interface ICreateProfile {
  execute(props: CreateProfileRequest): Promise<void>;
}