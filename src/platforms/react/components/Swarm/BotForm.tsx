import React from 'react';
import { Typography, Form, Input, Select, Button, Card, DatePicker, InputNumber } from 'antd';
import Bot from '@core/entities/Bot';
import Profile from '@core/entities/Profile';
import Retailer from '@core/entities/Retailer';
import PaymentCard from '@core/entities/PaymentCard';
import RetailerRepository from '@infrastructure/data/local/RetailerRepository';
import ProfileRepository from '@infrastructure/data/local/ProfileRepository';
import BotDTO from '@core/services/DTOs/BotDTO';

const { Title, Text } = Typography;
const { Option } = Select;

type IProps = {
  initialData?: BotDTO;
  onSubmit(data: Bot): void;
  onDiscard(): void;
}

const CustomForm = (props: any) => {
  const DATE_FORMAT = 'DD-MM-YYYY HH:mm';

  console.log(props)

  const [form] = Form.useForm();

  return(
    <Form className="form form-two-cols" form={form} onFinish={props.onSubmit}>
      <div className="form-single-col">
        <div>
          <Text className="form-input-label">Retailer</Text>
          <Form.Item
            name="retailer"
            initialValue={props.initialData?.retailer?.id}
            rules={[{ required: true, message: 'Please select a retailer' }]}
          >
            <Select
              className="form-input"
              placeholder="Retailer name"
              showSearch
            >
            { props.retailers?.map((retailer: Retailer) =>
              <Option value={retailer.id} key={retailer.id}>{retailer.name}</Option>
            ) }
            </Select>
          </Form.Item>
        </div>

        <div>
          <Text className="form-input-label">Product page</Text>
          <Form.Item
            name="productUrl"
            initialValue={props.initialData?.productUrl}
            rules={[{ required: true, message: 'Please enter the URL of the product you want to buy.' }]}
            >
            <Input placeholder="https://ireallywantthisthing.com/thisone" />
          </Form.Item>
        </div>

        <div className="form-two-cols">
          <div>
            <Text className="form-input-label">Start date/time</Text>
            <Form.Item name="startDate">
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
            <Form.Item name="checkStockInterval">
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
            initialValue={props.initialData?.profile?.id}
            rules={[{ required: true, message: 'Please select a profile' }]}
          >
            <Select placeholder="Who are you shopping as?" showSearch>
              { props.profiles?.map((profile: Profile) =>
                <Option value={profile.id} key={profile.id}>{profile.firstName} {profile.lastName}</Option>
              ) }
            </Select>
          </Form.Item>
        </div>
        
        <div>
          <Text className="form-input-label">Payment card</Text>
          <Form.Item
            name="paymentCard"
            initialValue={props.initialData?.paymentCard}
            rules={[{ required: true, message: 'Please select a payment card' }]}
          >
            <Select placeholder="How do you want to pay?" showSearch>
              {/* { props.profiles?.map((card: PaymentCard) =>
                <Option value={card.id} key={card.id}>Ending in {card.number.toString().slice(-4)}</Option>
              ) } */}
            </Select>
          </Form.Item>
        </div>
        
        <Form.Item>
          { props.editing
          ? <Button className="form-input" htmlType="submit" type="primary" size="large">Save Changes</Button>
          : <Button className="form-input" htmlType="submit" type="primary" size="large">Create Bot</Button> }
        </Form.Item>
      </div>
    </Form>
  );
}

type IState = {
  editing: boolean;
  retailers: Retailer[];
  profiles: Profile[];
}

export default class BotForm extends React.Component<IProps, IState> {
  state = {
    editing: false,
    retailers: [],
    profiles: []
  }

  retailerRepository: RetailerRepository;
  profileRepository: ProfileRepository;

  constructor(props: IProps) {
    super(props);

    this.retailerRepository = new RetailerRepository();
    this.profileRepository = new ProfileRepository();
  }

  componentDidMount() {
    if (this.props.initialData) this.setState({ editing: true });

    this.getRetailers();
    this.getProfiles();
  }

  async getRetailers() {
    this.setState({
      retailers: this.retailerRepository.getAll()
    });
  }

  async getProfiles() {
    this.setState({
      profiles: await this.profileRepository.getAll()
    });
  }

  render() {
    return(
      <div className="modal-wrapper">
        <div className="modal-overlay" onClick={this.props.onDiscard}></div>
        <div className="modal">
          <Title level={3}>{ this.state.editing ? 'Edit details' : 'Create new bot' }</Title>
          <CustomForm
            {...this.props}
            editing={this.state.editing}
            retailers={this.state.retailers}
            profiles={this.state.profiles}
          />
        </div>
      </div>
    );
  }
}