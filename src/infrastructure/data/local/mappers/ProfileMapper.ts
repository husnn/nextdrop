import Profile from '@core/entities/Profile';

export default class ProfileMapper {
  static toEntity({ _id, ...data }: any) {
    return new Profile({ id: _id, ...data });
  }
}