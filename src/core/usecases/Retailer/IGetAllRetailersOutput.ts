import Retailer from '@core/entities/Retailer';

export default interface IGetAllRetailersOutput {
  retailers: Retailer[];
  ok(retailers: Retailer[]): void;
}