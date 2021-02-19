import Retailer from "@core/entities/Retailer";

export default interface IRetailerRepository {
  get(id: string): Promise<Retailer>;
  getAll(): Promise<Retailer[]>;
}