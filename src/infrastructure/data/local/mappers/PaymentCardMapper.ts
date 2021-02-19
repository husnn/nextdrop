import PaymentCard from '@core/entities/PaymentCard';

export default class PaymentCardMapper {
  static toEntity({ _id, ...data }: any) {
    return new PaymentCard({ id: _id, ...data });
  }
}