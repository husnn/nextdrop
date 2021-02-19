import IBot from './interfaces/IBot';
import PaymentCard from './PaymentCard';
import Profile from "./Profile";
import Retailer from "./Retailer"

export default class Bot implements IBot {
  id: string;
  retailer: Retailer;
  productUrl: string;
  profile: Profile;
  paymentCard: PaymentCard;
  startDate?: Date;
  checkStockInterval?: number;

  constructor(props: IBot) {
    this.id = props.id;
    this.retailer = props.retailer;
    this.productUrl = props.productUrl;
    this.profile = props.profile;
    this.paymentCard = props.paymentCard;
    this.startDate = props.startDate;
    this.checkStockInterval = props.checkStockInterval;
  }
}