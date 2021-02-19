import ICreatePaymentCard from './ICreatePaymentCard';
import CreatePaymentCardRequest from './CreatePaymentCardRequest';
import IPaymentCardRepository from '@core/repositories/IPaymentCardRepository';

export default class CreatePaymentCard implements ICreatePaymentCard {
  paymentcardRepository: IPaymentCardRepository;
  
  constructor(paymentcardRepository: IPaymentCardRepository) {
    this.paymentcardRepository = paymentcardRepository;
  }

  async execute(props: CreatePaymentCardRequest): Promise<void> {
    await this.paymentcardRepository.create(props);
  }
}