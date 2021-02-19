import Profile from '@core/entities/Profile';

export default interface IProfileRepository {
  create(data: any): Promise<void>;
  get(id: string): Promise<Profile>;
  getAll(): Promise<Profile[]>;
  update(profile: Profile): Promise<Profile>;
  remove(id: string): Promise<void>;
}