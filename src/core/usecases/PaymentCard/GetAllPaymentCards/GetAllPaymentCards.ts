import IPaymentCardRepository from '@core/repositories/IPaymentCardRepository';
import GetAllPaymentCardsPresenter from './GetAllPaymentCardsPresenter';
import IGetAllPaymentCards from './IGetAllPaymentCards';
import IGetAllPaymentCardsOutput from './IGetAllPaymentCardsOutput';

export default class GetAllPaymentCards implements IGetAllPaymentCards {
  paymentcardRepository: IPaymentCardRepository;
  outputPort: IGetAllPaymentCardsOutput;

  constructor(paymentcardRepository: IPaymentCardRepository) {
    this.paymentcardRepository = paymentcardRepository;
    this.outputPort = new GetAllPaymentCardsPresenter();
  }

  async execute(): Promise<void> {
    const paymentcards = await this.paymentcardRepository.getAll();
    this.outputPort.ok(paymentcards);
  }
}