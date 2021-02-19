import Profile from '@core/entities/Profile';

type CreatePaymentCardRequestModel = {
  profile: Profile;
  number: string;
  expMonth: number;
  expYear: number;
  securityCode: number;
}

export default class CreatePaymentCardRequest implements CreatePaymentCardRequestModel {
  profile: Profile;
  number: string;
  expMonth: number;
  expYear: number;
  securityCode: number;

  constructor(props: CreatePaymentCardRequestModel) {
    this.profile = props.profile;
    this.number = props.number;
    this.expMonth = props.expMonth;
    this.expYear = props.expYear;
    this.securityCode = props.securityCode;
  }
}