import PaymentCard from '@core/entities/PaymentCard';
import IGetAllPaymentCardsOutput from './IGetAllPaymentCardsOutput';

export default class GetAllPaymentCardsPresenter implements IGetAllPaymentCardsOutput {
  paymentCards: PaymentCard[] = [];

  ok(paymentCards: PaymentCard[]): void { this.paymentCards = paymentCards }
}