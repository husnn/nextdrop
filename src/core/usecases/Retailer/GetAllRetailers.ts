import IRetailerRepository from '@core/repositories/IRetailerRepository';
import GetAllRetailersPresenter from './GetAllRetailersPresenter';
import IGetAllRetailers from './IGetAllRetailers';
import IGetAllRetailersOutput from './IGetAllRetailersOutput';

export default class GetAllRetailers implements IGetAllRetailers {
  retailerRepository: IRetailerRepository;
  outputPort: IGetAllRetailersOutput;

  constructor(retailerRepository: IRetailerRepository) {
    this.retailerRepository = retailerRepository;
    this.outputPort = new GetAllRetailersPresenter();
  }

  async execute(): Promise<void> {
    const retailers = await this.retailerRepository.getAll();
    this.outputPort.ok(retailers);
  }
}