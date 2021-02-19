import IDeletePaymentCard from './IDeletePaymentCard';
import IPaymentCardRepository from '@core/repositories/IPaymentCardRepository';

export default class DeletePaymentCard implements IDeletePaymentCard {
  paymentCardRepository: IPaymentCardRepository;
  
  constructor(paymentCardRepository: IPaymentCardRepository) {
    this.paymentCardRepository = paymentCardRepository;
  }

  async execute(id: string): Promise<void> {
    await this.paymentCardRepository.remove(id);
  }
}