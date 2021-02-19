import PaymentCard from '@core/entities/PaymentCard';

export default interface IPaymentCardRepository {
  create(data: any): Promise<void>;
  getAll(): Promise<PaymentCard[]>;
  update(card: PaymentCard): Promise<PaymentCard>;
  remove(id: string): Promise<void>;
}