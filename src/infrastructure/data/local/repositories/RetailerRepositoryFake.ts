import Retailer from '@core/entities/Retailer';
import IRetailerRepository from '@core/repositories/IRetailerRepository';
import retailers from '@infrastructure/data/retailers';

export default class RetailerRepositoryFake implements IRetailerRepository{
  get(id: string): Promise<Retailer> {
    throw new Error('Method not implemented.');
  }
  
  async getAll(): Promise<Retailer[]> {
    return retailers;
  }
}