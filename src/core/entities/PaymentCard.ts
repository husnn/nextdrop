import IPaymentCard from './interfaces/IPaymentCard';
import Profile from './Profile';

export default class PaymentCard implements IPaymentCard {
  id: string;
  profile: Profile;
  number: string;
  expMonth: number;
  expYear: number;
  securityCode: number;

  constructor(props: IPaymentCard) {
    this.id = props.id;
    this.profile = props.profile;
    this.number = props.number;
    this.expMonth = props.expMonth;
    this.expYear = props.expYear;
    this.securityCode = props.securityCode;
  }
}