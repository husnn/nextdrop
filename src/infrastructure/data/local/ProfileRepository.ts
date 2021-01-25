import Profile from '@core/entities/Profile';
import IProfileRepository from '@core/repositories/IProfileRepository';

import { profiles } from '@infrastructure/data/mock/profiles';

export default class ProfileRepository implements IProfileRepository {
  async getAll(): Promise<Profile[]> {
    return profiles;
  }
  async get(id: string): Promise<Profile | undefined> {
    return profiles[0];
  }
  findOne(query: any): Promise<Profile | undefined> {
    throw new Error('Method not implemented.');
  }
  create(item: Profile): Promise<Profile | undefined> {
    throw new Error('Method not implemented.');
  }
  update(item: Profile): Promise<Profile | undefined> {
    throw new Error('Method not implemented.');
  }
  remove(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
}