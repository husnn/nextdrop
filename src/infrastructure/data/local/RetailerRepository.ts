import Retailer from '@core/entities/Retailer';
import IRetailerRepository from '@core/repositories/IRetailerRepository';
import retailers from '@infrastructure/data/retailers';

export default class RetailerRepository implements IRetailerRepository{
  get(id: string): Retailer {
    return retailers.find(retailer => retailer.id == id)!;
  }

  getAll(): Retailer[] {
    return retailers;
  }
}