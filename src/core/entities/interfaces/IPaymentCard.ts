import Profile from '../Profile';

export default interface IPaymentCard {
  id: string;
  profile: Profile;
  number: string;
  expMonth: number;
  expYear: number;
  securityCode: number;
}