import path from "path";
import Datastore from "nedb-promises";

import IProfileRepository from "@core/repositories/IProfileRepository";
import Profile from "@core/entities/Profile";
import ProfileMapper from "../mappers/ProfileMapper";

export default class ProfileRepositoryFake implements IProfileRepository {
  db: Datastore;

  constructor() {
    this.db = Datastore.create(
      path.resolve(__dirname, "../db/fake/profiles.db")
    );
  }

  async create(data: any): Promise<void> {
    await this.db.insert(data);
  }

  get(id: string): Promise<Profile> {
    throw new Error("Method not implemented.");
  }

  async getAll(): Promise<Profile[]> {
    const profiles: Profile[] = [];

    const query = await this.db.find({});

    for await (const record of query) {
      profiles.push(ProfileMapper.toEntity(record));
    }

    return profiles;
  }

  async update(profile: Profile): Promise<Profile> {
    const { id, ...data } = profile;
    
    const updated = await this.db.update(
      { _id: id },
      { ...data },
      { multi: false, returnUpdatedDocs: true }
    );

    return ProfileMapper.toEntity(updated);
  }

  async remove(id: string): Promise<void> {
    await this.db.remove({ _id: id }, {});
  }
}
