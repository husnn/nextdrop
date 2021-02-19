import PaymentCard from '@core/entities/PaymentCard';
import Profile from '@core/entities/Profile';
import Retailer from '@core/entities/Retailer';

type CreateBotRequestModel = {
  retailer: Retailer;
  productUrl: string;
  profile: Profile;
  paymentCard: PaymentCard;
  startDate?: Date;
  checkStockInterval?: number;
}

export default class CreateBotRequest implements CreateBotRequestModel {
  retailer: Retailer;
  productUrl: string;
  profile: Profile;
  paymentCard: PaymentCard;
  startDate?: Date;
  checkStockInterval?: number;

  constructor(props: CreateBotRequestModel) {
    this.retailer = props.retailer;
    this.productUrl = props.productUrl;
    this.profile = props.profile;
    this.paymentCard = props.paymentCard;
    this.startDate = props.startDate;
    this.checkStockInterval = props.checkStockInterval;
  }
}