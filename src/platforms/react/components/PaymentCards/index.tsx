import React from "react";
import { Affix, Button } from "antd";

import PaymentCard from "@core/entities/PaymentCard";
import TableWithActions from "../TableWithActions";
import GetAllPaymentCards from "@core/usecases/PaymentCard/GetAllPaymentCards/GetAllPaymentCards";
import PaymentCardRepositoryFake from "@infrastructure/data/local/repositories/PaymentCardRepositoryFake";
import CreatePaymentCard from '@core/usecases/PaymentCard/CreatePaymentCard/CreatePaymentCard';
import PaymentCardForm from './PaymentCardForm';
import DeletePaymentCard from '@core/usecases/PaymentCard/DeletePaymentCard/DeletePaymentCard';
import UpdatePaymentCard from '@core/usecases/PaymentCard/UpdatePaymentCard/UpdatePaymentCard';

type IProps = {};

type IState = {
  paymentCards: PaymentCard[];
  paymentCardSelected: PaymentCard | undefined;
  formVisible: boolean;
};

export default class PaymentCards extends React.Component<IProps, IState> {
  state = {
    paymentCards: [],
    paymentCardSelected: undefined,
    formVisible: false,
  };

  getAllPaymentCardsUseCase: GetAllPaymentCards;
  createPaymentCardUseCase: CreatePaymentCard;
  updatePaymentCardUseCase: UpdatePaymentCard;
  deletePaymentCardUseCase: DeletePaymentCard;

  constructor(props: any) {
    super(props);

    const paymentcardRepository = new PaymentCardRepositoryFake();

    this.getAllPaymentCardsUseCase = new GetAllPaymentCards(paymentcardRepository);
    this.createPaymentCardUseCase = new CreatePaymentCard(paymentcardRepository);
    this.updatePaymentCardUseCase = new UpdatePaymentCard(paymentcardRepository);
    this.deletePaymentCardUseCase = new DeletePaymentCard(paymentcardRepository);
  }

  componentDidMount() {
    this.getPaymentCards();
  }

  async getPaymentCards() {
    await this.getAllPaymentCardsUseCase.execute();
    this.setState({ paymentCards: this.getAllPaymentCardsUseCase.outputPort.paymentCards });
  }

  onCreateBtnClicked() {
    this.setState({ paymentCardSelected: undefined, formVisible: true });
  }

  onSubmit(data: any) {
    data.id ? this.updatePaymentCard(data) : this.createPaymentCard(data);
    this.onDiscard();
  }

  async createPaymentCard(data: any) {
    await this.createPaymentCardUseCase.execute(data);
    this.getPaymentCards();
  }

  async updatePaymentCard(paymentCard: PaymentCard) {
    await this.updatePaymentCardUseCase.execute(paymentCard);
    this.getPaymentCards();
  }

  onDiscard() {
    this.setState({ formVisible: false });
  }

  async onClone(paymentCard: PaymentCard) {
    const { id, ...data } = paymentCard;
    this.createPaymentCard(data);
  }

  onEdit(paymentCard: PaymentCard) {
    this.setState({ paymentCardSelected: paymentCard, formVisible: true });
  }

  async onDelete(paymentCard: PaymentCard) {
    await this.deletePaymentCardUseCase.execute(paymentCard.id);
    this.getPaymentCards();
  }

  columns = [
    {
      title: 'Profile',
      key: 'profile',
      render: (_: string, record: any) => (
        <div>
          <span>
            {record.profile?.firstName} {record.profile?.lastName}
          </span>
          <br />
          <span>
            {record.profile?.address?.line}, {record.profile?.address?.city}
          </span>
        </div>
      )
    },
    {
      title: 'Number',
      dataIndex: 'number'
    },
    {
      title: 'Expiry',
      key: 'number',
      render: (_: string, record: any) => (
        <span>{record.expMonth}/{record.expYear}</span>
      )
    }
  ];

  render() {
    return (
      <div id="payment-cards">
        <TableWithActions
          data={this.state.paymentCards}
          columns={this.columns}
          onClone={this.onClone.bind(this)}
          onEdit={this.onEdit.bind(this)}
          onDelete={this.onDelete.bind(this)}
        />
        {this.state.formVisible && (
          <PaymentCardForm
            paymentCard={this.state.paymentCardSelected}
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
            Add new card
          </Button>
        </Affix>
      </div>
    );
  }
}
