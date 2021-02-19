import React from "react";
import { Affix, Button } from "antd";

import Profile from "@core/entities/Profile";
import TableWithActions from "../TableWithActions";
import GetAllProfiles from "@core/usecases/Profile/GetAllProfiles/GetAllProfiles";
import ProfileRepositoryFake from "@infrastructure/data/local/repositories/ProfileRepositoryFake";
import ProfileForm from "./ProfileForm";
import CreateProfile from '@core/usecases/Profile/CreateProfile/CreateProfile';
import DeleteProfile from '@core/usecases/Profile/DeleteProfile/DeleteProfile';
import UpdateProfile from '@core/usecases/Profile/UpdateProfile/UpdateProfile';

type IProps = {};

type IState = {
  profiles: Profile[];
  profileSelected: Profile | undefined;
  formVisible: boolean;
};

export default class Profiles extends React.Component<IProps, IState> {
  state = {
    profiles: [],
    profileSelected: undefined,
    formVisible: false,
  };

  getAllProfilesUseCase: GetAllProfiles;
  createProfileUseCase: CreateProfile;
  updateProfileUseCase: UpdateProfile;
  deleteProfileUseCase: DeleteProfile;

  constructor(props: any) {
    super(props);

    const profileRepository = new ProfileRepositoryFake();

    this.getAllProfilesUseCase = new GetAllProfiles(profileRepository);
    this.createProfileUseCase = new CreateProfile(profileRepository);
    this.updateProfileUseCase = new UpdateProfile(profileRepository);
    this.deleteProfileUseCase = new DeleteProfile(profileRepository);
  }

  componentDidMount() {
    this.getProfiles();
  }

  async getProfiles() {
    await this.getAllProfilesUseCase.execute();
    this.setState({ profiles: this.getAllProfilesUseCase.outputPort.profiles });
  }

  onCreateBtnClicked() {
    this.setState({ profileSelected: undefined, formVisible: true });
  }

  onSubmit(data: any) {
    data.id ? this.updateProfile(data) : this.createProfile(data);
    this.onDiscard();
  }

  async createProfile(data: any) {
    await this.createProfileUseCase.execute(data);
    this.getProfiles();
  }

  async updateProfile(profile: Profile) {
    await this.updateProfileUseCase.execute(profile);
    this.getProfiles();
  }

  onDiscard() {
    this.setState({ formVisible: false });
  }

  async onClone(profile: Profile) {
    const { id, ...data } = profile;
    this.createProfile(data);
  }

  onEdit(profile: Profile) {
    this.setState({ profileSelected: profile, formVisible: true });
  }

  async onDelete(profile: Profile) {
    await this.deleteProfileUseCase.execute(profile.id);
    this.getProfiles();
  }

  columns = [
    {
      title: 'Name',
      key: 'name',
      render: (_: string, record: any) => (
        <span>{record.firstName} {record.lastName}</span>
      )
    },
    {
      title: 'Email address',
      dataIndex: 'emailAddress',
    },
    {
      title: 'Phone number',
      dataIndex: 'phoneNumber',
    },
    {
      title: 'Address',
      key: 'address',
      render: (_: string, record: any) => (
        <div>
          <span>{record.address?.line}, {record.address?.city}</span><br/>
          <span>{record.address?.postCode}{record.address?.region ? ', ' + record.address?.region : ''}</span><br/>
          <span>{record.address?.country}</span>
        </div>
      )
    }
  ];

  render() {
    return (
      <div id="profiles">
        <TableWithActions
          data={this.state.profiles}
          columns={this.columns}
          onClone={this.onClone.bind(this)}
          onEdit={this.onEdit.bind(this)}
          onDelete={this.onDelete.bind(this)}
        />
        {this.state.formVisible && (
          <ProfileForm
            profile={this.state.profileSelected}
            onSubmit={this.onSubmit.bind(this)}
            onDiscard={this.onDiscard.bind(this)}
          />
        )}
        <Affix className="fab-wrapper">
          <Button
            type="primary"
            size="large"
            onClick={this.onCreateBtnClicked.bind(this)}
          >
            Create new profile
          </Button>
        </Affix>
      </div>
    );
  }
}
