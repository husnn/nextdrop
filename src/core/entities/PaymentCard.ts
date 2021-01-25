export type IPaymentCard = {
  id?: string;
  number: string;
  expMonth: number;
  expYear: number;
  securityCode: number;
}

export default class PaymentCard implements IPaymentCard {
  id?: string;
  number: string;
  expMonth: number;
  expYear: number;
  securityCode: number;

  constructor(data: IPaymentCard) {
    this.id = data.id;
    this.number = data.number;
    this.expMonth = data.expMonth;
    this.expYear = data.expYear;
    this.securityCode = data.securityCode;
  }
}