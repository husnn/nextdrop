import React from 'react';
import { Affix, Button } from 'antd';

import Profile from '@core/entities/Profile';
import ProfileService from '@core/services/ProfileService';
import ProfileRepository from '@infrastructure/data/local/ProfileRepository';
import TableWithActions from '../TableWithActions';

type IProps = {}

type IState = {
  profiles: Profile[],
  formVisible: boolean
}

export default class Profiles extends React.Component<IProps, IState> {
  state = {
    profiles: [],
    formVisible: false
  }

  profileService: ProfileService;

  constructor(props: any) {
    super(props);
    this.profileService = new ProfileService(new ProfileRepository());
  }

  componentDidMount() {
    this.getProfiles();
  }

  async getProfiles() {
    console.log("Getting all profiles...");
    const profiles = await this.profileService.getAll();
    this.setState({ profiles });
  }

  onCreateBtnClicked() {
    this.setState({ formVisible: true });
  }

  onDiscard() {
    this.setState({ formVisible: false });
  }

  async onClone(profile: Profile) {
    console.log("Cloning profile...");
  }

  onEdit(profile: Profile) {
    this.setState({ formVisible: true });
  }

  async onDelete(profile: Profile) {
    await this.profileService.delete(profile);
    this.getProfiles();
  }

  columns = [
    {
      title: 'First name',
      dataIndex: 'firstName'
    },
    {
      title: 'Last name',
      dataIndex: 'lastName'
    },
    {
      title: 'Email address',
      dataIndex: 'emailAddress'
    }
  ];

  render() {
    return(
      <div id="profiles">
        <TableWithActions
          data={this.state.profiles}
          columns={this.columns}
          onClone={this.onClone.bind(this)}
          onEdit={this.onEdit.bind(this)}
          onDelete={this.onDelete.bind(this)}
        />
        <Affix className="fab-wrapper">
          <Button type="primary" size="large" onClick={this.onCreateBtnClicked.bind(this)}>Create new profile</Button>
        </Affix>
      </div>
    );
  }
}