import IUpdatePaymentCard from './IUpdatePaymentCard';
import IPaymentCardRepository from '@core/repositories/IPaymentCardRepository';
import PaymentCard from '@core/entities/PaymentCard';

export default class UpdatePaymentCard implements IUpdatePaymentCard {
  paymentCardRepository: IPaymentCardRepository;
  
  constructor(paymentCardRepository: IPaymentCardRepository) {
    this.paymentCardRepository = paymentCardRepository;
  }

  async execute(paymentCard: PaymentCard): Promise<void> {
    await this.paymentCardRepository.update(paymentCard);
  }
}