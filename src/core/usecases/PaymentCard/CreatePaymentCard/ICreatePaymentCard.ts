import CreatePaymentCardRequest from './CreatePaymentCardRequest';

export default interface ICreatePaymentCard {
  execute(props: CreatePaymentCardRequest): Promise<void>;
}