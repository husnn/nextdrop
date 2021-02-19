import PaymentCard from '@core/entities/PaymentCard';

export default interface IGetAllPaymentCardsOutput {
  paymentCards: PaymentCard[];
  
  ok(paymentCards: PaymentCard[]): void;
}