import React from "react";
import { Typography, Form, Input, Select, Button } from "antd";
import Profile from "@core/entities/Profile";

const { Title, Text } = Typography;

type IProps = {
  profile?: Profile;
  onSubmit(data: any): void;
  onDiscard(): void;
};

const CustomForm = (props: any) => {
  const [form] = Form.useForm();

  const handleSubmit = (data: any) => {
    let profile: any = {};

    for (let [key, value] of Object.entries(data)) {
      if (key.includes(".")) {
        const split = key.split(".");
        const parent = split[0];
        key = split[1];

        if (!profile[parent]) {
          profile[parent] = {};
        }

        profile[parent][key] = value;
        continue;
      }

      profile[key] = value;
    }

    if (props.profile?.id) {
      profile = { id: props.profile.id, ...profile };
    }

    props.onSubmit(profile);
  };

  return (
    <Form className="form form-two-cols" form={form} onFinish={handleSubmit}>
      <div className="form-single-col">
        <div className="form-two-cols">
          <div>
            <Text className="form-input-label">First name</Text>
            <Form.Item
              name="firstName"
              initialValue={props.profile?.firstName}
              rules={[{ required: true }]}
            >
              <Input placeholder="Harry" />
            </Form.Item>
          </div>
          <div>
            <Text className="form-input-label">Last name</Text>
            <Form.Item
              name="lastName"
              initialValue={props.profile?.lastName}
              rules={[{ required: true }]}
            >
              <Input placeholder="Potter" />
            </Form.Item>
          </div>
        </div>

        <div className="form-two-cols">
          <div>
            <Text className="form-input-label">Email address</Text>
            <Form.Item
              name="emailAddress"
              initialValue={props.profile?.emailAddress}
              rules={[{ required: true }]}
            >
              <Input placeholder="bruce@wayneenterprises.com" />
            </Form.Item>
          </div>
          <div>
            <Text className="form-input-label">Phone number</Text>
            <Form.Item
              name="phoneNumber"
              initialValue={props.profile?.phoneNumber}
              rules={[{ required: true }]}
            >
              <Input placeholder="xxxxx xxx xxx" />
            </Form.Item>
          </div>
        </div>

        <div>
          <Text className="form-input-label">Address line</Text>
          <Form.Item
            name="address.line"
            initialValue={props.profile?.address?.line}
            rules={[{ required: true }]}
          >
            <Input placeholder="123 Main Street" />
          </Form.Item>
        </div>
      </div>
      <div className="form-single-col">
        <div className="form-two-cols">
          <div>
            <Text className="form-input-label">City</Text>
            <Form.Item
              name="address.city"
              initialValue={props.profile?.address?.city}
              rules={[{ required: true }]}
            >
              <Input placeholder="London" />
            </Form.Item>
          </div>
          <div>
            <Text className="form-input-label">Post code</Text>
            <Form.Item
              name="address.postCode"
              initialValue={props.profile?.address?.postCode}
              rules={[{ required: true }]}
            >
              <Input placeholder="AB1 2CD" />
            </Form.Item>
          </div>
        </div>

        <div className="form-two-cols">
          <div>
            <Text className="form-input-label">Region</Text>
            <Form.Item
              name="address.region"
              initialValue={props.profile?.address?.region}
            >
              <Input placeholder="Greater London" />
            </Form.Item>
          </div>
          <div>
            <Text className="form-input-label">Country</Text>
            <Form.Item
              name="address.country"
              initialValue={props.profile?.address?.country ? props.profile.address.country : 'United Kingdom'}
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
          </div>
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
              Create Profile
            </Button>
          )}
        </Form.Item>
      </div>
    </Form>
  );
};

type IState = {
  editing: boolean;
};

export default class ProfileForm extends React.Component<IProps, IState> {
  state = {
    editing: false,
  };

  componentDidMount() {
    if (this.props.profile) {
      this.setState({ editing: true });
    }
  }

  render() {
    return (
      <div className="modal-wrapper">
        <div className="modal-overlay" onClick={this.props.onDiscard}></div>
        <div className="modal">
          <Title level={3}>
            {this.state.editing ? "Edit details" : "Create new profile"}
          </Title>
          <CustomForm {...this.state} {...this.props} />
        </div>
      </div>
    );
  }
}
