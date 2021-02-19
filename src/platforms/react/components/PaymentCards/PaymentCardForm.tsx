import React from "react";
import { Typography, Form, Input, Select, Button } from "antd";
import PaymentCard from "@core/entities/PaymentCard";
import Profile from "@core/entities/Profile";
import ProfileRepositoryFake from "@infrastructure/data/local/repositories/ProfileRepositoryFake";
import GetAllProfiles from "@core/usecases/Profile/GetAllProfiles/GetAllProfiles";

const { Title, Text } = Typography;
const { Option } = Select;

type IProps = {
  paymentCard?: PaymentCard;
  onSubmit(data: any): void;
  onDiscard(): void;
};

const CustomForm = (props: any) => {
  const [form] = Form.useForm();

  const handleSubmit = (data: any) => {
    const profile = props.profiles.find(
      (profile: Profile) => profile.id === data.profile
    );

    if (!profile) return;

    let paymentCard = {
      ...data,
      profile
    };

    if (props.paymentCard?.id) {
      paymentCard = { id: props.paymentCard.id, ...paymentCard };
    }

    props.onSubmit(paymentCard);
  };

  return (
    <Form className="form form-two-cols" form={form} onFinish={handleSubmit}>
      <div className="form-single-col">
        <div>
          <Text className="form-input-label">Profile</Text>
          <Form.Item
            name="profile"
            initialValue={props.paymentCard?.profile?.id}
            rules={[{ required: true, message: "Please select a profile" }]}
          >
            <Select placeholder="Billing details" showSearch>
              {props.profiles?.map((profile: Profile) => (
                <Option value={profile.id} key={profile.id}>
                  {profile.firstName} {profile.lastName}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </div>
        <span></span>
        <span></span>
      </div>

      <div className="form-single-col">
        <div>
          <Text className="form-input-label">Card number</Text>
          <Form.Item
            name="number"
            initialValue={props.paymentCard?.number}
            rules={[{ required: true }]}
          >
            <Input placeholder="4242 4242 4242 4242" />
          </Form.Item>
        </div>

        <div className="form-three-cols">
          <div>
            <Text className="form-input-label">Expiry month</Text>
            <Form.Item
              name="expMonth"
              initialValue={props.paymentCard?.expMonth}
              rules={[{ required: true }]}
            >
              <Input placeholder="01" />
            </Form.Item>
          </div>

          <div>
            <Text className="form-input-label">Expiry year</Text>
            <Form.Item
              name="expYear"
              initialValue={props.paymentCard?.expYear}
              rules={[{ required: true }]}
            >
              <Input placeholder="2025" />
            </Form.Item>
          </div>

          <div>
            <Text className="form-input-label">Security code</Text>
            <Form.Item
              name="securityCode"
              initialValue={props.paymentCard?.securityCode}
              rules={[{ required: true }]}
            >
              <Input placeholder="123" />
            </Form.Item>
          </div>
        </div>

        <div>
          <Text style={{ display: "inline-block", paddingBottom: 8 }}>
            This information is kept offline on your device.
          </Text>
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
                Add New Card
              </Button>
            )}
          </Form.Item>
        </div>
      </div>
    </Form>
  );
};

type IState = {
  editing: boolean;
  profiles: Profile[];
};

export default class PaymentCardForm extends React.Component<IProps, IState> {
  state = {
    editing: false,
    profiles: [],
  };

  getAllProfilesUseCase: GetAllProfiles;

  constructor(props: IProps) {
    super(props);

    const profileRepository = new ProfileRepositoryFake();

    this.getAllProfilesUseCase = new GetAllProfiles(profileRepository);
  }

  componentDidMount() {
    if (this.props.paymentCard) {
      this.setState({ editing: true });
    }

    this.getProfiles();
  }

  async getProfiles() {
    await this.getAllProfilesUseCase.execute();
    this.setState({ profiles: this.getAllProfilesUseCase.outputPort.profiles });
  }

  render() {
    return (
      <div className="modal-wrapper">
        <div className="modal-overlay" onClick={this.props.onDiscard}></div>
        <div className="modal">
          <Title level={3}>
            {this.state.editing ? "Edit details" : "Add payment card"}
          </Title>
          <CustomForm {...this.state} {...this.props} />
        </div>
      </div>
    );
  }
}
