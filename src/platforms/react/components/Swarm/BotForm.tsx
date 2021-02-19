import React from "react";
import {
  Typography,
  Form,
  Input,
  Select,
  Button,
  DatePicker,
  InputNumber,
} from "antd";
import moment from 'moment';

import Bot from "@core/entities/Bot";
import Profile from "@core/entities/Profile";
import Retailer from "@core/entities/Retailer";
import PaymentCard from "@core/entities/PaymentCard";
import RetailerRepositoryFake from "@infrastructure/data/local/repositories/RetailerRepositoryFake";
import GetAllRetailers from "@core/usecases/Retailer/GetAllRetailers";
import ProfileRepositoryFake from "@infrastructure/data/local/repositories/ProfileRepositoryFake";
import GetAllProfiles from "@core/usecases/Profile/GetAllProfiles/GetAllProfiles";
import PaymentCardRepositoryFake from "@infrastructure/data/local/repositories/PaymentCardRepositoryFake";
import GetAllPaymentCards from "@core/usecases/PaymentCard/GetAllPaymentCards/GetAllPaymentCards";

const { Title, Text } = Typography;
const { Option } = Select;

type IProps = {
  bot?: Bot;
  onSubmit(data: any): void;
  onDiscard(): void;
  setFormVisibility(visible: boolean): void;
  slide: string | undefined;
};

const CustomForm = (props: any) => {
  const DATE_FORMAT = "DD-MM-YYYY HH:mm";

  const [form] = Form.useForm();

  const handleSubmit = (data: any) => {
    const retailer = props.retailers.find(
      (retailer: Retailer) => retailer.id === data.retailer
    );

    const profile = props.profiles.find(
      (profile: Profile) => profile.id === data.profile
    );

    const paymentCard = props.paymentCards.find(
      (paymentCard: PaymentCard) => paymentCard.id === data.paymentCard
    );

    if (!retailer || !profile || !paymentCard) return;

    let bot = {
      ...data,
      retailer,
      profile,
      paymentCard
    };

    if (props.bot?.id) {
      bot = { id: props.bot.id, ...bot };
    }

    props.onSubmit(bot);
  };

  return (
    <Form className="form form-two-cols" form={form} onFinish={handleSubmit}>
      <div className="form-single-col">
        <div>
          <Text className="form-input-label">Retailer</Text>
          <Form.Item
            name="retailer"
            initialValue={props.bot?.retailer?.id}
            rules={[{ required: true, message: "Please select a retailer" }]}
          >
            <Select
              className="form-input"
              placeholder="Retailer name"
              showSearch
            >
              {props.retailers?.map((retailer: Retailer) => (
                <Option value={retailer.id} key={retailer.id}>
                  {retailer.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </div>

        <div>
          <Text className="form-input-label">Product page</Text>
          <Form.Item
            name="productUrl"
            initialValue={props.bot?.productUrl}
            rules={[
              {
                required: true,
                message: "Please enter the URL of the product you want to buy.",
              },
            ]}
          >
            <Input placeholder="https://ireallywantthisthing.com/thisone" />
          </Form.Item>
        </div>

        <div className="form-two-cols">
          <div>
            <Text className="form-input-label">Start date/time</Text>
            <Form.Item
              name="startDate"
              initialValue={
                props.bot?.startDate
                  ? moment(props.bot?.startDate)
                  : null
                }
            >
              <DatePicker
                className="form-input"
                format={DATE_FORMAT}
                placeholder="When should it begin?"
                showTime
              />
            </Form.Item>
          </div>
          <div>
            <Text className="form-input-label">Stock check delay</Text>
            <Form.Item
              name="checkStockInterval"
              initialValue={props.bot?.checkStockInterval}
            >
              <InputNumber
                className="form-input"
                min={10}
                step={5}
                placeholder="Mins"
              />
            </Form.Item>
          </div>
        </div>
      </div>
      <div className="form-single-col">
        <div>
          <Text className="form-input-label">Profile</Text>
          <Form.Item
            name="profile"
            initialValue={props.bot?.profile?.id}
            rules={[{ required: true, message: "Please select a profile" }]}
          >
            <Select placeholder="Who are you shopping as?" showSearch>
              {props.profiles?.map((profile: Profile) => (
                <Option value={profile.id} key={profile.id}>
                  {profile.firstName} {profile.lastName}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </div>

        <div>
          <Text className="form-input-label">Payment card</Text>
          <Form.Item
            name="paymentCard"
            initialValue={props.bot?.paymentCard?.id}
            rules={
              [
                { required: true, message: "Please select a payment card" },
              ]
            }
          >
            <Select placeholder="How do you want to pay?" showSearch>
              {props.paymentCards?.map((card: PaymentCard) => (
                <Option value={card.id} key={card.id}>
                  Ending in {card.number?.toString().slice(-4)}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </div>

        <Form.Item>
          {props.editing ? (
            <Button
              className="form-input"
              htmlType="submit"
              type="primary"
              size="large"
            >
              Save Changes
            </Button>
          ) : (
            <Button
              className="form-input"
              htmlType="submit"
              type="primary"
              size="large"
            >
              Create Bot
            </Button>
          )}
        </Form.Item>
      </div>
    </Form>
  );
};

type IState = {
  editing: boolean;
  retailers: Retailer[];
  profiles: Profile[];
  paymentCards: PaymentCard[];
};

export default class BotForm extends React.Component<IProps, IState> {
  state = {
    editing: false,
    retailers: [],
    profiles: [],
    paymentCards: []
  };

  getAllProfilesUseCase: GetAllProfiles;
  getAllRetailersUseCase: GetAllRetailers;
  getAllPaymentCardsUseCase: GetAllPaymentCards;

  constructor(props: IProps) {
    super(props);

    const retailerRepository = new RetailerRepositoryFake();
    const profileRepository = new ProfileRepositoryFake();
    const paymentCardRepository = new PaymentCardRepositoryFake();

    this.getAllRetailersUseCase = new GetAllRetailers(retailerRepository);
    this.getAllProfilesUseCase = new GetAllProfiles(profileRepository);
    this.getAllPaymentCardsUseCase = new GetAllPaymentCards(
      paymentCardRepository
    );
  }

  componentDidMount() {
    if (this.props.bot) {
      this.setState({ editing: true });
    }

    this.getRetailers();
    this.getProfiles();
    this.getPaymentCards();
  }

  async getRetailers() {
    await this.getAllRetailersUseCase.execute();
    this.setState({
      retailers: this.getAllRetailersUseCase.outputPort.retailers,
    });
  }

  async getProfiles() {
    await this.getAllProfilesUseCase.execute();
    this.setState({ profiles: this.getAllProfilesUseCase.outputPort.profiles });
  }

  async getPaymentCards() {
    await this.getAllPaymentCardsUseCase.execute();
    this.setState({
      paymentCards: this.getAllPaymentCardsUseCase.outputPort.paymentCards,
    });
  }

  render() {
    return (
      <div className="modal-wrapper">
        <div className="modal-overlay" onClick={this.props.onDiscard}></div>
        <div
          className={`modal ${this.props.slide ? 'modal-slide--' + this.props.slide : ''}`}
          onAnimationEnd={() => {
            if (this.props.slide && this.props.slide == 'down') {
              this.props.setFormVisibility(false)
            }
          }}>
          <Title level={3}>
            {this.state.editing ? "Edit details" : "Create new bot"}
          </Title>
          <CustomForm {...this.state} {...this.props} />
        </div>
      </div>
    );
  }
}
