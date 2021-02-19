import Retailer from '@core/entities/Retailer';
import IGetAllRetailersOutput from './IGetAllRetailersOutput';

export default class GetAllRetailersPresenter implements IGetAllRetailersOutput {
  retailers: Retailer[] = [];

  ok(retailers: Retailer[]): void { this.retailers = retailers }
}