import path from 'path';
import Datastore from 'nedb-promises';
import IPaymentCardRepository from '@core/repositories/IPaymentCardRepository';
import PaymentCardMapper from '../mappers/PaymentCardMapper';
import PaymentCard from '@core/entities/PaymentCard';

export default class PaymentCardRepositoryFake implements IPaymentCardRepository {
  db: Datastore;

  constructor() {
    this.db = Datastore.create(path.resolve(__dirname, "../db/fake/payment-cards.db"));
  }

  async create(data: any): Promise<void> {
    await this.db.insert(data);
  }

  async getAll(): Promise<PaymentCard[]> {
    const paymentCards: PaymentCard[] = [];

    const query = await this.db.find({});

    for await (const record of query) {
      paymentCards.push(PaymentCardMapper.toEntity(record));
    }

    return paymentCards;
  }

  async update(card: PaymentCard): Promise<PaymentCard> {
    const { id, ...data } = card;
    
    const updated = await this.db.update(
      { _id: id },
      { ...data },
      { multi: false, returnUpdatedDocs: true }
    );

    return PaymentCardMapper.toEntity(updated);
  }

  async remove(id: string): Promise<void> {
    await this.db.remove({ _id: id }, {});
  }
}
