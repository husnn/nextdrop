import PaymentCard from '../PaymentCard';
import Profile from '../Profile';
import Retailer from '../Retailer';

export default interface IBot {
  id: string;
  retailer: Retailer;
  productUrl: string;
  profile: Profile;
  paymentCard: PaymentCard;
  startDate?: Date;
  checkStockInterval?: number;
}