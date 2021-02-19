import React from "react";
import { Affix, Button, Typography } from "antd";

import logIcon from "@platforms/react/assets/ic-log.svg";
import playIcon from "@platforms/react/assets/ic-play.svg";
import stopIcon from "@platforms/react/assets/ic-stop.svg";

import Bot from "@core/entities/Bot";
import BotRepositoryFake from "@infrastructure/data/local/repositories/BotRepositoryFake";
import BotForm from "./BotForm";
import TableWithActions from "../TableWithActions";
import CreateBot from "@core/usecases/Bot/CreateBot/CreateBot";
import GetAllBots from "@core/usecases/Bot/GetAllBots/GetAllBots";
import DeleteBot from "@core/usecases/Bot/DeleteBot/DeleteBot";
import UpdateBot from "@core/usecases/Bot/UpdateBot/UpdateBot";
import ScraperService from '@infrastructure/services/ScraperService';
import ScraperStatus from '@infrastructure/scrapers/ScraperStatus';

const { Text } = Typography;

type IProps = {};

type IState = {
  bots: Bot[];
  botSelected: Bot | undefined;
  botStatus?: any;
  scraperToBot: any;
  formVisible: boolean;
  formSlide: string | undefined;
};

export default class Swarm extends React.Component<IProps, IState> {
  state = {
    bots: [],
    botSelected: undefined,
    botStatus: {},
    scraperToBot: [],
    formVisible: false,
    formSlide: undefined,
  };

  getAllBotsUseCase: GetAllBots;
  createBotUseCase: CreateBot;
  updateBotUseCase: UpdateBot;
  deleteBotUseCase: DeleteBot;

  scraperService: ScraperService;

  constructor(props: IProps) {
    super(props);

    const botRepository = new BotRepositoryFake();

    this.getAllBotsUseCase = new GetAllBots(botRepository);
    this.createBotUseCase = new CreateBot(botRepository);
    this.updateBotUseCase = new UpdateBot(botRepository);
    this.deleteBotUseCase = new DeleteBot(botRepository);

    this.scraperService = new ScraperService();

    this.scraperService.on("statusUpdate", ({ id, status }) => {
      const botId = this.state.scraperToBot[id];
      if (!botId) return;

      this.setState((state: IState) => ({
        ...state,
        botStatus: {
          ...state.botStatus,
          [botId]: status,
        },
      }));
    });
  }

  componentDidMount() {
    this.getBots();
  }

  async getBots() {
    await this.getAllBotsUseCase.execute();
    const bots = this.getAllBotsUseCase.outputPort.bots;

    console.log(bots);

    this.setState({ bots });
  }

  async onSubmit(data: any) {
    data.id ? this.updateBot(data) : this.createBot(data);
    this.onDiscard();
  }

  async createBot(data: any) {
    await this.createBotUseCase.execute(data);
    this.getBots();
  }

  async updateBot(bot: Bot) {
    await this.updateBotUseCase.execute(bot);
    this.getBots();
  }

  onCreateBtnClicked() {
    this.setState({
      botSelected: undefined,
      formVisible: true,
      formSlide: "up",
    });
  }

  onDiscard() {
    this.setState({
      formSlide: "down",
    });
  }

  async runBot(bot: Bot) {
    const scraper = this.scraperService.createScraper(bot);
    if (!scraper) return;

    await new Promise((resolve: any) => {
      this.setState((state: IState) => ({
        ...state,
        scraperToBot: {
          ...state.scraperToBot,
          [scraper.id]: bot.id,
        },
        botStatus: {
          ...state.botStatus,
          [bot.id]: ScraperStatus.Running,
        },
      }), resolve());
    });

    this.scraperService.run(scraper);
  }

  async stopBot(bot: Bot) {
    const scraperId = this.getScraperIdForBot(bot);
    if (!scraperId) return;

    await this.scraperService.stop(scraperId);

    const botStatus = this.state.botStatus;
    delete botStatus[bot.id];

    const scraperToBot = this.state.scraperToBot;
    delete scraperToBot[scraperId]

    this.setState((state: IState) => ({
      ...state,
      scraperToBot,
      botStatus
    }));
  }

  getScraperIdForBot(bot: Bot) {
    return Object.keys(this.state.scraperToBot).find(
      (key: string) => this.state.scraperToBot[key] === bot.id
    );
  }

  async onClone(bot: Bot) {
    const { id, ...data } = bot;
    this.createBot(data);
  }

  onEdit(bot: Bot) {
    this.setState({
      botSelected: bot,
      formVisible: true,
      formSlide: "up",
    });
  }

  async onDelete(bot: Bot) {
    await this.deleteBotUseCase.execute(bot.id);
    this.getBots();
  }

  columns = [
    {
      title: "Retailer",
      dataIndex: "retailer",
      render: (_: string, record: any) => <span>{record.retailer?.name}</span>,
    },
    {
      title: "Product",
      dataIndex: "productUrl",
      width: "30%",
    },
    {
      title: "Profile",
      dataIndex: "profile",
      render: (_: string, record: any) => (
        <div>
          <span>
            {record.profile?.firstName} {record.profile?.lastName}
          </span>
          <br />
          <span>
            {record.profile?.address?.line}, {record.profile?.address?.city}
          </span>
          <br />
          <span>{record.profile?.address?.postCode}</span>
        </div>
      ),
    },
    {
      title: "Status",
      key: "status",
      render: (_: string, record: any) => {
        return <span>{this.state.botStatus[record.id]}</span>;
      },
    },
    {
      key: "operations",
      render: (_: string, record: any) => (
        <span className="table-row-actions">
          {/* <img src={logIcon} height={16} onClick={() => this.viewLogs(record)} /> */}
          {
            !this.state.botStatus[record.id] &&
            <img
              src={playIcon}
              height={14}
              onClick={() => this.runBot(record)}
            />
          }
          {
            this.state.botStatus[record.id] &&
            <img
              src={stopIcon}
              height={16}
              onClick={() => this.stopBot(record)}
            />
          }
        </span>
      ),
    },
  ];

  render() {
    return (
      <div id="swarm">
        <div className="table-info">
          <div className="table-info__counters">
            <Text>Number of bots: {this.state.bots.length}</Text>
            <Text>Bots running: {Object.keys(this.state.botStatus).length}</Text>
          </div>
        </div>
        <TableWithActions
          rowSettings={{
            rowClassName: (record: any) =>
              this.state.botStatus[record.id]
                ? "table-row--running"
                : null,
          }}
          data={this.state.bots}
          columns={this.columns}
          onClone={this.onClone.bind(this)}
          onEdit={this.onEdit.bind(this)}
          onDelete={this.onDelete.bind(this)}
        />
        {this.state.formVisible && (
          <BotForm
            setFormVisibility={(value: any) =>
              this.setState({ formVisible: value })
            }
            slide={this.state.formSlide}
            bot={this.state.botSelected}
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
            Create new bot
          </Button>
        </Affix>
      </div>
    );
  }
}
