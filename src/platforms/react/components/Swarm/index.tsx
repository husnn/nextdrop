import React from 'react';
import { Affix, Button } from 'antd';

import Bot from '@core/entities/Bot';
import BotService from '@core/services/BotService';
import BotRepository from '@infrastructure/data/local/BotRepository';
import BotForm from './BotForm';
import TableWithActions from '../TableWithActions';
import RetailerRepository from '@infrastructure/data/local/RetailerRepository';
import ProfileRepository from '@infrastructure/data/local/ProfileRepository';
import BotDTO from '@core/services/DTOs/BotDTO';

type IProps = {}

type IState = {
  bots: BotDTO[];
  botSelected: BotDTO | undefined;
  formVisible: boolean;
}

export default class Swarm extends React.Component<IProps, IState> {
  state = {
    bots: [],
    botSelected: undefined,
    formVisible: false
  }

  botService: BotService;

  constructor(props: IProps) {
    super(props);

    const botRepository = new BotRepository();
    const retailerRepository = new RetailerRepository();
    const profileRepository = new ProfileRepository();

    this.botService = new BotService(botRepository, retailerRepository, profileRepository);
  }

  componentDidMount() {
    this.getBots()
  }

  async getBots() {
    const bots = await this.botService.getAll();
    this.setState({ bots });
  }

  async onSubmit(data: Bot) {
    console.log(data); return;
    await this.botService.createOrUpdate(data);
    this.getBots();
  }

  onCreateBtnClicked() {
    this.setState({ botSelected: undefined, formVisible: true });
  }

  onDiscard() {
    this.setState({ formVisible: false });
  }

  async onClone(bot: Bot) {
    console.log("Cloning bot...");
  }

  onEdit(bot: BotDTO) {
    this.setState({ botSelected: bot, formVisible: true });
  }

  async onDelete(bot: Bot) {
    this.getBots();
  }

  columns = [
    {
      title: 'Retailer',
      dataIndex: 'retailer',
      render: (_: string, record: any) => <p>{ record.retailer.name }</p>
    },
    {
      title: 'Product',
      dataIndex: 'productUrl'
    },
    {
      title: 'Profile',
      dataIndex: 'profile',
      render: (_: string, record: any) => (
        <div>
          <span>{ record.profile.firstName } { record.profile.lastName }</span><br />
          <span>{ record.profile.address.line }, { record.profile.address.city }</span>
        </div>
      )
    }
  ];

  render() {
    return(
      <div id="swarm">
        <TableWithActions
          data={this.state.bots}
          columns={this.columns}
          onClone={this.onClone.bind(this)}
          onEdit={this.onEdit.bind(this)}
          onDelete={this.onDelete.bind(this)}
        />
        { this.state.formVisible &&
          <BotForm
            initialData={this.state.botSelected}
            onSubmit={this.onSubmit.bind(this)}
            onDiscard={this.onDiscard.bind(this)}
          /> }
        <Affix className="fab-wrapper">
          <Button type="primary" size="large" onClick={this.onCreateBtnClicked.bind(this)}>Create new bot</Button>
        </Affix>
      </div>
    );
  }
}