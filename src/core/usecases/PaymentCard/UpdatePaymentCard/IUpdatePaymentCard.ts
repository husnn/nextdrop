import PaymentCard from '@core/entities/PaymentCard';

export default interface IUpdatePaymentCard {
  execute(paymentcard: PaymentCard): Promise<void>;
}