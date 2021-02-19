export default interface IDeletePaymentCard {
  execute(id: string): Promise<void>;
}